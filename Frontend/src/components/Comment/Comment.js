import React, { useEffect, useRef, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { AiOutlineSend } from "react-icons/ai";
import { BiConfused } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getUserSelector } from "../../features/auth/authSlice";
import { commentRequestProperty } from "../../features/requestProperty/requestPropertySlice";
import { ChatBody, ChatContent, ChatMessage } from "./comment";
import "./comment.module.scss";

const Comment = ({ commentable_id, commentable_type, comments, name }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector(getUserSelector);
  const [content, setContent] = useState("");
  const commentEndRef = useRef(null);

  const scrollToBottom = () => {
    commentEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleComment = (e) => {
    e.preventDefault();
    const data = {
      content,
      commentable_id,
      commentable_type,
    };
    dispatch(commentRequestProperty(data));
    setContent("");
  };

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  return (
    <Card className="mt-2">
      <Card.Header>
        <div className="d-flex align-items-center">
          <div className="name flex-grow-1">
            <h6 className="mb-0">{name}</h6>
          </div>
        </div>
      </Card.Header>

      <Card.Body>
        <ChatContent>
          {comments?.map((comment, index) => (
            <ChatBody key={comment.id}>
              <ChatMessage
                className={currentUser?.id == comment.staff_id ? null : "left"}
                ref={index === comments.length - 1 ? commentEndRef : null}
              >
                {comment.content}
              </ChatMessage>
            </ChatBody>
          ))}
        </ChatContent>
      </Card.Body>
      <Card.Footer>
        <div className="d-flex align-items-center">
          <BiConfused />
          <Form onSubmit={handleComment} className="d-flex flex-grow-1 ml-4">
            <Form.Control
              placeholder="Type your message.."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form>
          <AiOutlineSend onClick={handleComment} />
        </div>
      </Card.Footer>
    </Card>
  );
};

export default Comment;
