import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { getUser, RequestChangesAPI } from "../router/apis";
import store from "../zustandStore/store";
import { FormField } from "./pageHelpers";
import toast from "react-hot-toast";

export const RequestChanges = () => {
  const [PopUp, setPopup] = useState(false);
  const { RequestChangesData, setRequestChangesData, topicsData } = store();

  const { whatChanges, WhyChanges, topicName } = RequestChangesData;
  const handleInputChange = (data) => {
    setRequestChangesData({
      ...RequestChangesData,
      [data.target.name]: data.target.value,
    });
  };
  const submitUserComment = (event) => {
    event.preventDefault();
    const current = getUser("user");
    const username = current.email;
    const adminEmail = "anushagowda673@gmail.com";
    if (!whatChanges || !WhyChanges || !topicName) {
      toast.error("Please enter all required fields");
      return;
    } else {
      const Data = { username, whatChanges, WhyChanges, topicName, adminEmail };
      RequestChangesAPI(Data)
        .then((res) => {
          setRequestChangesData({
            whatChanges: "",
            WhyChanges: "",
            topicName: "",
          });
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
        className='btn btn-outline-dark m-0 '
        onClick={() => setPopup(true)}
      >
        Request Changes
      </button>
      <Modal isOpen={PopUp} toggle={() => setPopup(!PopUp)} centered>
        <ModalHeader toggle={() => setPopup(!PopUp)}>
          Request Changes <span className='loader-time'></span>
        </ModalHeader>
        <ModalBody className='all-form container-fluid'>
          <form onSubmit={submitUserComment}>
            <select
              name='topicName'
              value={topicName}
              onChange={handleInputChange}
              className='form-control'
            >
              <option value=''>Please select a topic</option>
              {topicsData.map((topic) => {
                const { _id, title } = topic;
                return (
                  <option key={_id} value={title}>
                    {title}
                  </option>
                );
              })}
            </select>
            <FormField
              label='What changes Do You want...?'
              type='textarea'
              name='whatChanges'
              value={whatChanges}
              onChange={handleInputChange}
              placeholder='Enter the Your changes '
            />
            <FormField
              label='Why Do You want these Changes...?'
              type='textarea'
              name='WhyChanges'
              value={WhyChanges}
              onChange={handleInputChange}
              placeholder='Enter the reason for Changes '
            />
            <button className='btn btn-success'> Send Request </button>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};
