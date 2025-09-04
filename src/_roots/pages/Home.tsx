import HomeSidebar from "@/components/shared/HomeSidebar";
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

const Home = () => {
  const { theme } = useTheme();
  return (
    <main
      className={`min-h-screen ${
        theme === "light" ? "bg-gray-50" : " bg-gray-900"
      } `}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* Main Content Area */}
        <div className="lg:col-span-2 p-6">
          {/* Feed Content */}
          <div className="space-y-6">
            {/* Placeholder for blog posts */}
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
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 hidden md:block">
          <HomeSidebar />
        </div>
      </div>
    </main>
  );
};

export default Home;
