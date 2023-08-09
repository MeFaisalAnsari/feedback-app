"use client";
import Link from "next/link";
import styles from "../../styles/addFeedback.module.scss";
import IconNewFeedback from "../../assets/shared/icon-new-feedback.svg";
import IconArrowLeft from "../../assets/shared/icon-arrow-left.svg";
import Image from "next/image";
import { Feedback } from "@/Types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AddFeedbackProps {}
const AddFeedback: React.FC<AddFeedbackProps> = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("feature");
  const [existingFeedbacks, setExistingFeedbacks] = useState<Feedback[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedFeedbacks = JSON.parse(
      localStorage.getItem("feedbacks") || "[]"
    );
    setExistingFeedbacks(storedFeedbacks);
  }, []);

  const handleAddFeedback = () => {
    if (!title || !description) {
      return;
    }

    const newFeedback: Feedback = {
      id: calculateNextAvailableId(),
      title,
      category,
      upvotes: 0,
      status: "suggestion",
      description,
      comments: [],
    };

    const updatedFeedbacks = [...existingFeedbacks, newFeedback];
    setExistingFeedbacks(updatedFeedbacks);

    localStorage.setItem("feedbacks", JSON.stringify(updatedFeedbacks));

    router.push("/");
  };

  const calculateNextAvailableId = (): number => {
    const existingIds = existingFeedbacks.map((feedback) => feedback.id);
    const highestId = Math.max(...existingIds, 0);
    return highestId + 1;
  };

  return (
    <div className={styles.container}>
      <div>
        <Link href="./">
          <button className="btn-transparent">
            <Image src={IconArrowLeft} alt="Arrow left" /> Go Back
          </button>
        </Link>
      </div>
      <div className={styles.formContainer}>
        <Image
          src={IconNewFeedback}
          alt="New Feedback"
          className={styles.newIcon}
        />
        <h1>Create New Feedback</h1>
        <div className="form-label">
          <h4>Feedback Title</h4>
          <p>Add a short, descriptive headline</p>
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
        />
        <div className="form-label">
          <h4>Category</h4>
          <p>Choose a category for your feedback</p>
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="form-input"
        >
          <option value="feature">Feature</option>
          <option value="ui">UI</option>
          <option value="ux">UX</option>
          <option value="enhancement">Enhancement</option>
          <option value="bug">Bug</option>
        </select>
        <div className="form-label">
          <h4>Feedback Detail</h4>
          <p>
            Include any specific comments on what should be improved, added,
            etc.
          </p>
        </div>
        <textarea
          className="form-input"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className={styles.buttonContainer}>
          <Link href="./">
            <button className="btn btn3 btn-hover-light">Cancel</button>
          </Link>
          <button
            className="btn btn1 btn-hover-light"
            onClick={handleAddFeedback}
          >
            Add Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFeedback;
