import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "../components/Layout";
import { Calendar, Clock, ArrowRight } from "phosphor-react";
import blogPostsData from "../data/blog/blogPosts.json";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
  slug: string;
};

const blogPosts: BlogPost[] = blogPostsData as BlogPost[];

const Blog: React.FC = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="border-b border-slate-200 bg-white py-14 sm:py-20">
        <div className="section-container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-3xl space-y-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-secondary">
              Blog
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Artículos sobre eficiencia energética y renovables
            </h1>
            <p className="text-base text-slate-600 sm:text-lg">
              Guías prácticas, normativas actualizadas y casos reales para ayudarte
              a entender y mejorar la eficiencia energética de tu edificio.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Lista de artículos */}
      <section className="border-b border-slate-200 bg-white py-14 sm:py-16">
        <div className="section-container">
          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {blogPosts.map((post) => (
              <motion.article
                key={post.id}
                variants={fadeInUp}
                className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-brand-secondary px-3 py-1 text-[11px] font-semibold text-white">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} weight="duotone" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} weight="duotone" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <h2 className="mb-2 text-lg font-semibold tracking-tight text-slate-900 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-secondary transition hover:gap-3"
                  >
                    Leer más
                    <ArrowRight size={16} weight="bold" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;

