import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { getUser, updateTopicAPI } from "../router/apis";
import {
  stripHtmlTags,
  FormField,
  DropdownOptions,
  animateLabel,
} from "../Helpers/pageHelpers";
import toast from "react-hot-toast";

export const UpdateTopic = ({ ui, topic }) => {
  const [Popup, setPopup] = useState(false);
  const [imageController, setImageController] = useState(null);
  const [description, setDescription] = useState(topic.description);
  const [previewSrc, setPreviewSrc] = useState(
    topic.img ? `data:image/png;base64,${topic.img.data}` : ""
  );

  const [updateForm, setUpdateForm] = useState({
    title: topic.title,
    level: topic.level,
    purpose: topic.purpose,
    type: topic.type,
    details: topic.details,
    reference: topic.reference,
    imageInfo: topic.imageInfo,
    userInfo: topic.userInfo,
  });
  const { title, level, purpose, type, details, reference, imageInfo } =
    updateForm;
  const id = topic._id;
  const createFormData = () => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", title);
    formData.append("level", level);
    formData.append("purpose", purpose);
    formData.append("type", type);
    formData.append("details", details);
    formData.append("reference", reference);
    formData.append("description", description);
    formData.append("imageInfo", imageInfo);
    formData.append("image", imageController);
    formData.append("userInfo", getUser("user").email);
    return formData;
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdateForm({ ...updateForm, [name]: value });
  };
  const handleImageUpload = (event) => {
    setImageController(event.target.files[0]);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewSrc(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !title ||
      !level ||
      !purpose ||
      !type ||
      !details ||
      !reference ||
      !description ||
      !imageInfo
    ) {
      toast.error("Please enter all required fields");
      return;
    }

    const formPayload = createFormData();
    updateTopicAPI(formPayload)
      .then((res) => {
        ui(res);
        document.getElementById("previewImage").src = "";
        toast.success(res.data.message);
        if (res.data.message === "Topic Updated Successfully") {
          setPopup(false);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <>
      <button
        className='btn btn-outline-warning mr-2 fadeIn'
        onClick={() => {
          setPopup(true);
        }}
      >
        update
      </button>
      <Modal centered isOpen={Popup} toggle={() => setPopup(!Popup)} size='xl'>
        <ModalHeader toggle={() => setPopup(!Popup)}>
          Update topic - {title}
        </ModalHeader>
        <ModalBody className='teacher-form container-fluid'>
          <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className='row'>
              <div className='col-md-6'>
                <FormField
                  label='Title'
                  type='text'
                  name='title'
                  value={title}
                  onChange={handleInputChange}
                  placeholder='Enter the title'
                />
                <label htmlFor='level' className='form-label '>
                  Level
                </label>
                <DropdownOptions
                  options={["", "Easy", "Medium", "Difficult"]}
                  name='level'
                  value={level}
                  onChange={handleInputChange}
                />
                <FormField
                  label='Purpose'
                  type='textarea'
                  name='purpose'
                  value={stripHtmlTags(purpose)}
                  onChange={handleInputChange}
                  placeholder='Enter the purpose'
                />
                <FormField
                  label='Reference (URL)'
                  type='url'
                  name='reference'
                  value={reference}
                  onChange={handleInputChange}
                  placeholder='Enter the reference URL'
                />
                <FormField
                  label='Image Information'
                  type='textarea'
                  name='imageInfo'
                  value={imageInfo}
                  onChange={handleInputChange}
                  placeholder='Enter image information'
                />
              </div>
              <div className='col-md-6'>
                <label htmlFor='type' className='form-label '>
                  Type of Accountancy Topic
                </label>
                <DropdownOptions
                  options={[
                    "",
                    "Management accounting",
                    "Cost accounting",
                    "Consistency",
                    "Entity concept",
                    "Double-entry bookkeeping",
                    "Revenue recognition",
                    "Money measurement concept",
                    "Statement of changes in equity",
                  ]}
                  name='type'
                  value={type}
                  onChange={handleInputChange}
                />
                <FormField
                  label='Details'
                  type='textarea'
                  name='details'
                  value={details}
                  onChange={handleInputChange}
                  placeholder='Enter the details'
                />
                <div className='mb-3 '>
                  <input
                    type='file'
                    accept='image/png, image/jpeg'
                    name='image'
                    onChange={handleImageUpload}
                    onFocus={() => {
                      animateLabel("in", "imageTopic");
                    }}
                    onBlur={() => {
                      animateLabel("out", "imageTopic");
                    }}
                    className='form-control mt-2'
                  />
                </div>
                <div className='mb-3 centered-image'>
                  {previewSrc && (
                    <img
                      id='previewImage'
                      width='60%'
                      className='img-fluid'
                      src={previewSrc}
                      alt=''
                    />
                  )}
                </div>
              </div>
              {/* <FormField
                label='Description'
                type='textarea'
                name='description'
                value={stripHtmlTags(description)}
                onChange={handleInputChange}
                placeholder='Enter the description'
              /> */}
              <FormField
                label='Description'
                type='quill'
                name='description'
                value={description}
                onChange={setDescription}
              />
            </div>

            <button className='btn btn-success mr-2 fadeIn' type='submit'>
              Update Topic
            </button>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};
