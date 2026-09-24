import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { BLOGS } from '@/data/blogs';
import BlogDetailClient from './BlogDetailClient';

export function generateStaticParams() {
  return BLOGS.map((b) => ({
    id: b.id,
  }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const blog = BLOGS.find((b) => b.id === params.id);
  if (!blog) {
    return {
      title: 'Article Not Found | SGWWSP',
    };
  }
  return {
    title: `${blog.title} | Shree Ganesh Steel Workshop`,
    description: blog.summary,
  };
}

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const blog = BLOGS.find((b) => b.id === params.id);

  if (!blog) {
    notFound();
  }

  return <BlogDetailClient blog={blog} />;
}
