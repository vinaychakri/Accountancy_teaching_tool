import React, { useState, useEffect, useCallback } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import {
  getUser,
  CommentTopicAPI,
  getCommentBYtitleAPI,
  deleteCommentAPI,
  updateCommentAPI,
} from "../router/apis";
import store from "../zustandStore/store";
import { FormField } from "./pageHelpers";
import toast from "react-hot-toast";

export const Comment = ({ title, userInfo, id, updateState }) => {
  const [PopUp, setPopup] = useState(false);
  const { commentData, setCommentData } = store();

  const { rating, review } = commentData;
  const handleInputChange = (data) => {
    setCommentData({
      ...commentData,
      [data.target.name]: data.target.value,
    });
  };
  const submitUserComment = (event) => {
    event.preventDefault();
    const current = getUser("user");
    const username = current.email;
    if (!rating || !review) {
      toast.error("Please enter all required fields");
      return;
    } else {
      const Data = { title, username, rating, review, userInfo, id };
      CommentTopicAPI(Data)
        .then((res) => {
          setCommentData({
            rating: "",
            review: "",
          });
          updateState();
          toast.success(res.data.message);
          setPopup(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };
  return (
    <>
      <button className='btn btn-danger' onClick={() => setPopup(true)}>
        Any Comments
      </button>
      <Modal isOpen={PopUp} toggle={() => setPopup(!PopUp)} centered>
        <ModalHeader toggle={() => setPopup(!PopUp)}>
          Comment <span className='loader-time'></span>
        </ModalHeader>
        <ModalBody className='comment'>
          <form onSubmit={submitUserComment}>
            <div className='row'>
              <div className='col-3'>
                <label className='labels form-control'>Rating: </label>
              </div>
              <div className='col-9'>
                <div className='range-container'>
                  <input
                    className='form-control range-input'
                    type='range'
                    name='rating'
                    value={rating}
                    onChange={handleInputChange}
                  />
                  <div className='range-tooltip'>{rating}%</div>
                </div>
              </div>
            </div>
            <FormField
              label='Review'
              type='textarea'
              name='review'
              value={review}
              onChange={handleInputChange}
              placeholder='Please Enter your review'
            />
            <button className='btn btn-success'> add Review </button>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export const GetComment = ({ id, state }) => {
  const { getComments, getCommentData } = store();
  const currentUser = getUser("user").email;
  const [handler, setHandler] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCommentBYtitleAPI(id);
        getCommentData(res.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchData();
  }, [getCommentData, id, state, handler]);

  const deleteComment = useCallback(
    async (id) => {
      try {
        await deleteCommentAPI(id);
        getCommentData(getComments.filter((comment) => comment._id !== id));
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    },
    [getComments, getCommentData]
  );

  return (
    <>
      <h6 className='mb-2 text-center'>
        <b>Comments </b>
      </h6>
      {getComments.length === 0 ? (
        <h5 className='text-center'>
          <b>We don't have any Comments yet on this Topic.</b>
        </h5>
      ) : (
        getComments.map((comment) => {
          const { _id, title, username, rating, review, updatedAt } = comment;
          return (
            <div key={_id} className='container row get-comment'>
              <div className='col-8'>
                <li>
                  <b>{title}</b>
                </li>
              </div>
              <div className='col-4'>
                <li>Rating: {rating} %</li>
              </div>
              Comment:
              <li className='review'>
                <i>{review}</i>
                <br></br>
                commented at {updatedAt.split("T")[0]}
              </li>
              {username === currentUser ? (
                <>
                  <div className='col-6 mb-2'>
                    <button
                      className='btn btn-danger m-0'
                      onClick={() => deleteComment(_id)}
                    >
                      delete
                    </button>
                  </div>
                  <div className='col-6'>
                    <EditComment
                      currentComment={comment}
                      manageUpdate={(Handler) => setHandler(Handler)}
                    />
                  </div>
                </>
              ) : (
                <i className='text-end'>
                  Commented by<b> {username}</b>
                </i>
              )}
            </div>
          );
        })
      )}
    </>
  );
};

// Updated a comment is handled here
export const EditComment = ({ manageUpdate, currentComment }) => {
  const [Popup, setPopup] = useState(false);
  const [UserComment, setUserComment] = useState({
    rating: currentComment.rating,
    review: currentComment.review,
  });
  const { rating, review } = UserComment;

  const EditCommentPopupHandler = () => {
    setPopup(true);
  };
  const UserCommentHandler = (data) => {
    setUserComment({
      ...UserComment,
      [data.target.name]: data.target.value,
    });
  };
  const submitUserComment = (event) => {
    event.preventDefault();
    const commentId = currentComment._id;
    const Data = { rating, review, commentId };
    if (!rating || !review) {
      toast.error("Please enter all required fields");
      return;
    } else {
      updateCommentAPI(Data)
        .then((res) => {
          manageUpdate(res);
          toast.success(res.data.message);
          setPopup(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };
  return (
    <>
      <button
        className='btn btn-outline-warning'
        onClick={EditCommentPopupHandler}
      >
        Update Review
      </button>
      <Modal centered isOpen={Popup} toggle={() => setPopup(!Popup)}>
        <ModalHeader toggle={() => setPopup(!Popup)}>
          Update Comment <span className='loader-time'></span>
        </ModalHeader>
        <ModalBody className='comment'>
          <form onSubmit={submitUserComment}>
            <div className='row'>
              <div className='col-3'>
                <label className='labels form-control'>Rating: </label>
              </div>
              <div className='col-9'>
                <div className='range-container'>
                  <input
                    className='form-control range-input'
                    type='range'
                    name='rating'
                    value={rating}
                    onChange={UserCommentHandler}
                  />
                  <div className='range-tooltip'>{rating}%</div>
                </div>
              </div>
            </div>
            <FormField
              label='Review'
              type='textarea'
              name='review'
              value={review}
              onChange={UserCommentHandler}
              placeholder='Please Enter your review'
            />
            <button className='btn btn-success'> Update Comment </button>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};
