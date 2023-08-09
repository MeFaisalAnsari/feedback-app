"use client";
import Sidebar from "@/components/Sidebar";
import Suggestions from "@/components/Suggestions";
import styles from "../styles/home.module.scss";
import { Feedback } from "@/Types";
import { useEffect, useState } from "react";
import { initializeLocalStorage } from "@/localStorage";

const Home: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("Most Upvotes");

  useEffect(() => {
    initializeLocalStorage();

    const storedFeedbacks = JSON.parse(
      localStorage.getItem("feedbacks") || "[]"
    );
    setFeedbacks(storedFeedbacks);
  }, []);

  return (
    <div className={styles.home}>
      <aside>
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </aside>
      <main>
        <Suggestions
          feedbacks={feedbacks}
          sortBy={sortBy}
          setSortBy={setSortBy}
          selectedCategory={selectedCategory}
        />
      </main>
    </div>
  );
};

export default Home;
