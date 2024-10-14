import React, { useState } from "react";
import store from "../zustandStore/store";
import { getUser, addAccountancyTopicAPI } from "../router/apis";
import {
  animateLabel,
  DropdownOptions,
  FormField,
} from "../Helpers/pageHelpers";
import defaultImage from "../images/default_Image.png";
import toast from "react-hot-toast";

export const Teacher = () => {
  const {
    setImageController,
    imageController,
    accountancyTopicFrom,
    setAccountancyTopicFrom,
  } = store();

  const { title, level, type, details, reference, imageInfo } =
    accountancyTopicFrom;

  const [purpose, setPurpose] = useState("");
  const [description, setDescription] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAccountancyTopicFrom({ ...accountancyTopicFrom, [name]: value });
  };

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setImageController(selectedFile);

      const reader = new FileReader();
      reader.onload = () => {
        const previewImage = document.getElementById("previewImage");
        previewImage.src = reader.result;
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const createFormData = () => {
    const formData = new FormData();
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const requiredFields = [
      "title",
      "level",
      "type",
      "details",
      "reference",
      "imageInfo",
    ];
    const missingFields = requiredFields.filter(
      (field) => !accountancyTopicFrom[field]
    );

    if (missingFields.length > 0) {
      toast.error(
        `Please enter all required fields: ${missingFields.join(", ")}`
      );
      return;
    }

    if (!imageController) {
      toast.error("Please select an image");
      return;
    }

    const FormData = createFormData();
    addAccountancyTopicAPI(FormData)
      .then((res) => {
        setAccountancyTopicFrom({
          title: "",
          level: "",
          purpose: "",
          type: "",
          details: "",
          reference: "",
          description: "",
          imageInfo: "",
        });
        setPurpose("");
        setDescription("");
        setImageController(null);
        document.getElementById("previewImage").src = "";
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className='teacher-form container mt-1'>
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
              type='quill'
              name='purpose'
              value={purpose}
              onChange={setPurpose}
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
              {imageController ? (
                <img
                  id='previewImage'
                  alt=''
                  width='60%'
                  className='img-fluid'
                />
              ) : (
                <img
                  id='previewImage'
                  alt=''
                  src={defaultImage}
                  width='60%'
                  className='img-fluid'
                />
              )}
            </div>
          </div>
        </div>
        <FormField
          label='Description'
          type='quill'
          name='description'
          value={description}
          onChange={setDescription}
        />

        <div className='mb-3'>
          <button className='btn btn-success mr-2 fadeIn' type='submit'>
            Add Topic
          </button>
        </div>
      </form>
    </div>
  );
};
