/**
 * Utility to compress images to a target size range of 100 KB - 200 KB.
 * Works seamlessly in client-side Next.js / React with HTML5 Canvas.
 */

export interface CompressionResult {
  dataUrl: string;
  sizeKb: number;
  width: number;
  height: number;
  originalSizeKb: number;
  fileName: string;
}

/**
 * Compresses an uploaded image file so its final size lands within the target 100 KB - 200 KB range.
 * If the original image is too large, it scales dimensions and adjusts JPEG quality.
 * If the image is smaller, it preserves maximum sharpness while staying under 200 KB.
 */
export async function compressImageToTargetRange(
  file: File,
  targetMinKb = 100,
  targetMaxKb = 200
): Promise<CompressionResult> {
  const originalSizeKb = Math.round(file.size / 1024);

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error('Failed to read image file.'));

    reader.onload = (event) => {
      const img = new Image();

      img.onerror = () => reject(new Error('Invalid image file.'));

      img.onload = () => {
        const origW = img.width;
        const origH = img.height;

        // Helper to generate a dataUrl and calculate size in KB
        const generate = (maxDim: number, quality: number) => {
          let w = origW;
          let h = origH;

          if (w > maxDim || h > maxDim) {
            if (w > h) {
              h = Math.round((h * maxDim) / w);
              w = maxDim;
            } else {
              w = Math.round((w * maxDim) / h);
              h = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = Math.max(1, w);
          canvas.height = Math.max(1, h);
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            throw new Error('Canvas 2D context not available.');
          }

          // Use white background in case source has transparency
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, w, h);
          ctx.drawImage(img, 0, 0, w, h);

          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          // Base64 size formula: length minus header times 3/4
          const base64Content = dataUrl.split(',')[1] || '';
          const bytes = Math.round(base64Content.length * 0.75);
          const sizeKb = Math.round(bytes / 1024);

          return { dataUrl, sizeKb, width: w, height: h };
        };

        // Candidate test configurations: [maxDimension, quality]
        // We order candidate configs starting from high resolution downwards
        const candidateConfigs = [
          { maxDim: 1800, quality: 0.9 },
          { maxDim: 1600, quality: 0.85 },
          { maxDim: 1400, quality: 0.82 },
          { maxDim: 1300, quality: 0.78 },
          { maxDim: 1200, quality: 0.75 },
          { maxDim: 1100, quality: 0.72 },
          { maxDim: 1000, quality: 0.7 },
          { maxDim: 900, quality: 0.65 },
          { maxDim: 800, quality: 0.6 },
          { maxDim: 700, quality: 0.55 },
          { maxDim: 600, quality: 0.5 },
        ];

        let bestResult = generate(1400, 0.82);

        // Find configuration that lands in 100KB - 200KB
        let foundInRange = false;

        for (const config of candidateConfigs) {
          const res = generate(config.maxDim, config.quality);

          if (res.sizeKb <= targetMaxKb && res.sizeKb >= targetMinKb) {
            bestResult = res;
            foundInRange = true;
            break;
          }

          // If size is under targetMaxKb, it's a valid candidate (prefer largest size under 200KB)
          if (res.sizeKb <= targetMaxKb) {
            if (!foundInRange || res.sizeKb > bestResult.sizeKb) {
              bestResult = res;
            }
          }
        }

        // If even the smallest config was > 200KB, perform fine-tuned binary search on quality
        if (bestResult.sizeKb > targetMaxKb) {
          let lowQ = 0.2;
          let highQ = 0.65;
          let currentDim = 700;

          for (let i = 0; i < 6; i++) {
            const midQ = (lowQ + highQ) / 2;
            const res = generate(currentDim, midQ);

            bestResult = res;

            if (res.sizeKb > targetMaxKb) {
              highQ = midQ;
              currentDim = Math.max(400, currentDim - 60);
            } else if (res.sizeKb < targetMinKb) {
              lowQ = midQ;
            } else {
              break;
            }
          }
        }

        // Return clean result
        resolve({
          dataUrl: bestResult.dataUrl,
          sizeKb: bestResult.sizeKb,
          width: bestResult.width,
          height: bestResult.height,
          originalSizeKb,
          fileName: file.name,
        });
      };

      img.src = event.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}
