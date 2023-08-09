"use client";
import React, { useEffect, useState } from "react";
import styles from "../styles/suggestionsFeed.module.scss";
import IconComments from "../assets/shared/icon-comments.svg";
import IconArrowUp from "../assets/shared/icon-arrow-up.svg";
import IconArrowUpWhite from "../assets/shared/icon-arrow-up-white.svg";
import Image from "next/image";
import { Feedback } from "@/Types";

interface SuggestionsFeedProps {
  feedbacks: Feedback[];
  sortBy: string;
  selectedCategory: string;
}

const SuggestionsFeed: React.FC<SuggestionsFeedProps> = ({
  feedbacks,
  sortBy,
  selectedCategory,
}) => {
  const [upvotedFeedbacks, setUpvotedFeedbacks] = useState<number[]>([]);

  useEffect(() => {
    const storedUpvotedFeedbacks = JSON.parse(
      localStorage.getItem("upvotedFeedbacks") || "[]"
    );
    setUpvotedFeedbacks(storedUpvotedFeedbacks);
  }, []);

  useEffect(() => {
    localStorage.setItem("upvotedFeedbacks", JSON.stringify(upvotedFeedbacks));
  }, [upvotedFeedbacks]);

  const filteredFeedbacks =
    selectedCategory === "all"
      ? feedbacks
      : feedbacks.filter((feedback) => feedback.category === selectedCategory);

  const sortFeedbacks = () => {
    if (sortBy === "Most Upvotes") {
      return [...filteredFeedbacks].sort((a, b) => b.upvotes - a.upvotes);
    } else if (sortBy === "Least Upvotes") {
      return [...filteredFeedbacks].sort((a, b) => a.upvotes - b.upvotes);
    } else if (sortBy === "Most Comments") {
      return [...filteredFeedbacks].sort(
        (a, b) =>
          (b.comments ? b.comments.length : 0) -
          (a.comments ? a.comments.length : 0)
      );
    } else if (sortBy === "Least Comments") {
      return [...filteredFeedbacks].sort(
        (a, b) =>
          (a.comments ? a.comments.length : 0) -
          (b.comments ? b.comments.length : 0)
      );
    } else {
      return filteredFeedbacks;
    }
  };

  const sortedFeedbacks = sortFeedbacks();

  const handleUpvote = (feedbackId: number) => {
    if (!upvotedFeedbacks.includes(feedbackId)) {
      setUpvotedFeedbacks([...upvotedFeedbacks, feedbackId]);
    }
  };

  return (
    <div>
      {sortedFeedbacks.map((request) => {
        const isUpvoted = upvotedFeedbacks.includes(request.id);
        return (
          <div className={styles.suggestionsFeed} key={request.id}>
            <div className={styles.left}>
              <div
                className={`${styles.votes} ${isUpvoted ? styles.active : ""}`}
                onClick={() => handleUpvote(request.id)}
              >
                <Image
                  src={isUpvoted ? IconArrowUpWhite : IconArrowUp}
                  alt="Arrow Up"
                />
                <div className="body3 font-bold">
                  {request.upvotes + (isUpvoted ? 1 : 0)}
                </div>
              </div>
              <div className={styles.details}>
                <h3>{request.title}</h3>
                <p>{request.description}</p>
                {request.category && (
                  <span
                    className={`label ${
                      request.category.length > 2
                        ? "text-capitalize"
                        : "text-uppercase"
                    }`}
                  >
                    {request.category}
                  </span>
                )}
              </div>
            </div>
            <div className={styles.right}>
              <Image src={IconComments} alt="Comment" />
              <p className="font-bold">
                {request.comments ? request.comments.length : 0}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SuggestionsFeed;
