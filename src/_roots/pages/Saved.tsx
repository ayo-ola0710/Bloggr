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

const Saved = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`${
        theme === "light" ? "bg-gray-50" : "bg-gray-900"
      } md:pl-10 md:pr-20 px-5  pt-7 pb-7 space-y-8 grid grid-cols-1 md:grid-cols-2 gap-6`}
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

export default Saved;
