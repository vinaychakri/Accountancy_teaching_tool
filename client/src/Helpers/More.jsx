import React, { useState, useReducer } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { stripHtmlTags } from "./pageHelpers";
import { TopicExam } from "./TopicsExam";
import { ScientificCalculator } from "./ScientificCalculator";
import { Comment, GetComment } from "./Comment";
import { config } from "./ChatBot/config.jsx";
import MessageParser from "./ChatBot/MessageParser.jsx";
import ActionProvider from "./ChatBot/ActionProvider.jsx";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";

const AccountingEdToolChatBot = () => {
  return (
    <div>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
        headerText='Accounting EdTool'
        placeholderText='Ask anything....?'
        runInitialMessagesWithHistory
        disableScrollToBottom
      />
    </div>
  );
};

const More = ({ topic }) => {
  const {
    title,
    level,
    purpose,
    type,
    details,
    reference,
    description,
    imageInfo,
    userInfo,
    img,
    _id,
    updatedAt,
  } = topic;

  const [Popup, setPopup] = useState(false);
  const [PopupChat, setPopupChat] = useState(false);

  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [PopupImage, setPopupImage] = useState(false);
  const [state, dispatch] = useReducer((x) => x + 1, 0);

  const openFullscreenImage = (imageData) => {
    setFullscreenImage(imageData);
  };

  const closeFullscreenImage = () => {
    setFullscreenImage(null);
  };
  const navigateToReference = () => {
    window.open(reference, "_blank");
  };

  const handleEmailClick = (userEmailAddress) => {
    const subject = "Your Subject"; // Set the subject of the email
    const body = "Your message goes here"; // Set the body of the email
    const mailtoLink = `mailto:${userEmailAddress}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <>
      <button
        className='btn btn-outline-dark border'
        onClick={() => {
          setPopup(true);
        }}
      >
        More
      </button>
      <Modal
        isOpen={Popup}
        toggle={() => setPopup(!Popup)}
        fullscreen
        fade={true}
      >
        <ModalHeader toggle={() => setPopup(!Popup)}>{title}</ModalHeader>
        <ModalBody className='More-model-body'>
          <React.Fragment>
            <div className='col-12 col-md-6'>
              <div className='row'>
                <div className='col-8'>
                  <li>Topic Name : {title}</li>
                </div>
                <div className='col-4'>
                  <li>Level : {level}</li>
                </div>
              </div>
              <div className='row'>
                <div className='col-8'>
                  <li>Type of Topic : {type}</li>
                </div>
                <div className='col-4'>
                  <li>Date : {updatedAt.split("T")[0]}</li>
                </div>
              </div>
              <li>
                <h6>
                  If you want to learn more about the topic, Here is the
                  Reference :
                </h6>
                <span className='reference-link' onClick={navigateToReference}>
                  {reference}
                </span>
              </li>
              <li>
                <h6> Detail about Topic :</h6>
                {details}
              </li>
            </div>
            <div className='col-12 col-md-6 col-xl-3'>
              <div className='col-12 col-md-12 d-flex justify-content-center align-items-center '>
                <img
                  id='previewImage'
                  src={`data:image/png;base64,${img.data}`}
                  alt=''
                  height={280}
                  width={300}
                  onClick={() => {
                    openFullscreenImage(img.data);
                    setPopupImage(true);
                  }}
                />
              </div>
              {window.location.pathname === "/student" && (
                <>
                  <TopicExam title={title} id={_id} />
                </>
              )}
            </div>
            <div className='col-12 col-md-12 col-xl-3'>
              <li>
                <h6> Image Related Information :</h6>
                {imageInfo}
              </li>
              {window.location.pathname === "/student" && (
                <>
                  <Comment
                    title={title}
                    userInfo={userInfo}
                    id={_id}
                    updateState={() => {
                      dispatch();
                    }}
                  />
                  <ScientificCalculator />
                </>
              )}
            </div>
            <div
              className={
                window.location.pathname === "/student"
                  ? "col-12 col-md-6"
                  : "col-12"
              }
            >
              <li>
                <h6> Purpose of the Topic :</h6>
                {stripHtmlTags(purpose)}
              </li>
            </div>
            {window.location.pathname === "/student" && (
              <div className='col-12 col-md-6 mt-3 mb-2 get-comments-container'>
                <GetComment id={_id} state={state} />
              </div>
            )}
            <div className='col-12'>
              <h6 className='text-center'> Detail Explanation about {title}</h6>
              <li
                className='description'
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          </React.Fragment>
        </ModalBody>
        {(window.location.pathname === "/otherTopics" ||
          window.location.pathname === "/student") && (
          <ModalFooter>
            <h6>
              <i>Any Query contact:</i>
            </h6>
            <span
              style={{
                cursor: "pointer",
                color: "green",
                textDecoration: "none",
                border: "2px solid green",
                borderRadius: "10px",
                transition: "color 0.3s, borderBottom 0.3s",
                display: "inline-block",
                margin: "0 5px",
                padding: "5px",
              }}
              onClick={() => handleEmailClick(userInfo)}
            >
              {userInfo}
            </span>
            <button
              className='btn btn-outline-secondary'
              onClick={() => {
                setPopupChat(true);
              }}
            >
              Help ?
            </button>
          </ModalFooter>
        )}
      </Modal>
      {fullscreenImage && (
        <Modal
          isOpen={PopupImage}
          toggle={() => setPopupImage(!PopupImage)}
          className='fullscreen-modal'
        >
          <ModalBody>
            <div className='fullscreen-image'>
              <img
                src={`data:image/png;base64,${fullscreenImage}`}
                alt=''
                height={465}
                width={465}
                onClick={closeFullscreenImage}
              />
            </div>
          </ModalBody>
        </Modal>
      )}
      <Modal
        size='sm'
        isOpen={PopupChat}
        toggle={() => setPopupChat(!PopupChat)}
        centered
      >
        <ModalBody>
          <AccountingEdToolChatBot />
        </ModalBody>
      </Modal>
    </>
  );
};

export default More;
