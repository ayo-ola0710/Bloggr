import BlogCard from "@/components/shared/BlogCard";
import useTheme from "@/hooks/useTheme";

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
  const { theme } = useTheme();
  return (
    <div
      className={`md:pl-10 md:pr-20 px-5 pt-7 space-y-8 ${
        theme === "light" ? "bg-gray-50 " : "bg-gray-900"
      }`}
    >
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
