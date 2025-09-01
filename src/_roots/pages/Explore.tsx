import BlogCard from "@/components/shared/BlogCard";

const data = [
  {
    inital: "JD",
    name: "John Doe",
    time: 2,
    topic: " Getting Started with React Development",
    writeup:
      "Learn the fundamentals of React and build your first component This comprehensive guide covers everything you need to know to start your React journey",
  },
  {
    inital: "JD",
    name: "John Doe",
    time: 2,
    topic: " Getting Started with React Development",
    writeup:
      "Learn the fundamentals of React and build your first component This comprehensive guide covers everything you need to know to start your React journey",
  },
  {
    inital: "JD",
    name: "John Doe",
    time: 2,
    topic: " Getting Started with React Development",
    writeup:
      "Learn the fundamentals of React and build your first component This comprehensive guide covers everything you need to know to start your React journey",
  },
];

const Explore = () => {
  return (
    <div className="pl-10 pr-20 bg-gray-50 pt-7 space-y-8">
      {data.map((item, index) => (
        <BlogCard
          key={index}
          inital={item.inital}
          time={item.time}
          topic={item.topic}
          writeup={item.writeup}
          name={item.name}
        />
      ))}
    </div>
  );
};

export default Explore;
