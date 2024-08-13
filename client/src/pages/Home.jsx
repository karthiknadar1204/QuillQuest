import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import temp from "../assets/temp-banner.jpeg";
import "../../src/App.css"

const ContainerScroll = ({ titleComponent }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[80rem] flex items-center justify-center relative p-20"
      ref={containerRef}
    >
      <div
        className="py-40 w-full relative"
        style={{
          perspective: '1000px',
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale} />
      </div>
    </div>
  );
};

const Header = ({ translate, titleComponent }) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center relative z-10"
    >
      {titleComponent}
    </motion.div>
  );
};

const Card = ({ rotate, scale, translate }) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full p-6 bg-[#222222] rounded-[30px] shadow-2xl relative z-10"
    >
      <div className="bg-gray-100 h-full w-full rounded-2xl gap-4 overflow-hidden p-4 transition-all">
        <img
          src={temp}
          alt="bannerImage"
          className="object-cover border-8 rounded-2xl w-full h-full"
        />
      </div>
    </motion.div>
  );
};

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="meteor"
            style={{
              left: `${Math.random() * 100}vw`,
              animationDuration: `${Math.random() * 5 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5 + 0.5,
            }}
          />
        ))}
      </div>
      <ContainerScroll
        titleComponent={
          <div className="flex items-center flex-col relative z-10">
            <button
              className="p-8 mb-8 md:mb-0 text-2xl w-full sm:w-fit border-t-2 rounded-full border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
            >
              <Link to='/create-post' >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-600 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black architects-daughter">
                  Start Your Blogging Journey
                </span>
              </Link>
            </button>
            <h1 className="text-5xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
              Express Your Ideas with QuillQuest
            </h1>
          </div>
        }
      />
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7 relative z-10">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl font-semibold text-center mt-[-4rem] architects-daughter">Recent Posts</h2>
            <div className="flex flex-wrap gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
