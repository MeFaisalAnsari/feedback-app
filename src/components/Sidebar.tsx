import Link from "next/link";
import React from "react";
import styles from "../styles/sidebar.module.scss";

interface SidebarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}
const Sidebar: React.FC<SidebarProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.title}>
        <h2>Eqaim</h2>
        <p className="body2">Feedback Board</p>
      </div>
      <div className={styles.filter}>
        <span
          className={`label label-hover body3 ${
            selectedCategory === "all" ? "active" : ""
          }`}
          onClick={() => setSelectedCategory("all")}
        >
          All
        </span>
        <span
          className={`label label-hover body3 ${
            selectedCategory === "ui" ? "active" : ""
          }`}
          onClick={() => setSelectedCategory("ui")}
        >
          UI
        </span>
        <span
          className={`label label-hover body3 ${
            selectedCategory === "ux" ? "active" : ""
          }`}
          onClick={() => setSelectedCategory("ux")}
        >
          UX
        </span>
        <span
          className={`label label-hover body3 ${
            selectedCategory === "enhancement" ? "active" : ""
          }`}
          onClick={() => setSelectedCategory("enhancement")}
        >
          Enhancement
        </span>
        <span
          className={`label label-hover body3 ${
            selectedCategory === "bug" ? "active" : ""
          }`}
          onClick={() => setSelectedCategory("bug")}
        >
          Bug
        </span>
        <span
          className={`label label-hover body3 ${
            selectedCategory === "feature" ? "active" : ""
          }`}
          onClick={() => setSelectedCategory("feature")}
        >
          Feature
        </span>
      </div>
      <div className={styles.roadmap}>
        <div className={styles.roadmap__header}>
          <h3>Roadmap</h3>
          <Link href="/roadmap">
            <p className="body3">View</p>
          </Link>
        </div>
        <div className={styles.roadmap__item}>
          <div className={styles.roadmap__title}>
            <div className="bg-orange"></div>
            <p>Planned</p>
          </div>
          <div className={styles.roadmap__quantity}>0</div>
        </div>
        <div className={styles.roadmap__item}>
          <div className={styles.roadmap__title}>
            <div className="bg-purple"></div>
            <p>In-Progress</p>
          </div>
          <div className={styles.roadmap__quantity}>0</div>
        </div>
        <div className={styles.roadmap__item}>
          <div className={styles.roadmap__title}>
            <div className="bg-sky-blue"></div>
            <p>Live</p>
          </div>
          <div className={styles.roadmap__quantity}>0</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
