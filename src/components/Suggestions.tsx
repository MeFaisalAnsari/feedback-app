"useClient";
import { Feedback } from "@/Types";
import React, { useEffect, useState } from "react";
import SuggestionsFeed from "./SuggestionsFeed";
import SuggestionsHeader from "./SuggestionsHeader";

interface SuggestionsProps {
  feedbacks: Feedback[];
  sortBy: string;
  selectedCategory: string;
  setSortBy: (sort: string) => void;
}

const Suggestions: React.FC<SuggestionsProps> = ({
  feedbacks,
  sortBy,
  setSortBy,
  selectedCategory,
}) => {
  const totalFeedbacks =
    selectedCategory === "all"
      ? feedbacks.length
      : feedbacks.filter((feedback) => feedback.category === selectedCategory)
          .length;

  return (
    <div>
      <SuggestionsHeader
        totalFeedbacks={totalFeedbacks}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <SuggestionsFeed
        feedbacks={feedbacks}
        sortBy={sortBy}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default Suggestions;
