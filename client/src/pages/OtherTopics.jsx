import React, { useEffect, useState } from "react";
import { getTopicsAPI, getUser } from "../router/apis";
import { Modal, ModalBody } from "reactstrap";
import store from "../zustandStore/store";
import More from "../Helpers/More";
import { RequestChanges } from "../Helpers/RequestChanges";
import { Loader } from "../Helpers/pageHelpers";

export const OtherTopics = () => {
  const { topicsData, setTopicsData, uiStatus } = store();
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [searchList, setSearchList] = useState([]);
  const [Popup, setPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const current = getUser("user");
  const username = current.email;

  const openFullscreenImage = (imageData) => {
    setFullscreenImage(imageData);
  };

  const closeFullscreenImage = () => {
    setFullscreenImage(null);
    setPopup(false);
  };

  useEffect(() => {
    setIsLoading(true);

    getTopicsAPI()
      .then((res) => {
        setTopicsData(res.data);
        setSearchList(res.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setTopicsData, uiStatus]);

  const filter = (e) => {
    const value = e.target.value.toLowerCase();
    const results = searchList.filter((topic) =>
      `${topic.title} `.toLowerCase().includes(value)
    );
    setTopicsData(results);
  };

  return (
    <div className='container'>
      <h2 className='card-title text-center mb-3'>
        Topics Created By Other Teachers
      </h2>
      <div className='row'>
        <div className='row'>
          <div className='col-md-2'>
            <h2 className='text-center mb-4'>Search</h2>
          </div>
          <div className='col-md-8'>
            <input
              id='search'
              name='search'
              className='form-control'
              placeholder='Enter title of the topic name.....'
              onInput={filter}
            />
          </div>
          <div className='col-md-2'>
            <RequestChanges />
          </div>
        </div>
        {isLoading ? (
          <Loader />
        ) : topicsData.length === 0 ? (
          <h1 className='text-center'>No Topics with the specified name.</h1>
        ) : (
          topicsData
            .filter((topic) => topic.userInfo !== username)
            .map((topic) => {
              const { _id, img, title } = topic;
              return (
                <div key={_id} className='col-md-4 mb-5'>
                  <div className='card animated fadeIn'>
                    <img
                      id='previewImage'
                      src={`data:image/png;base64,${img.data}`}
                      alt={title}
                      className='card-img-top'
                      height={300}
                      width={200}
                      onClick={() => {
                        openFullscreenImage(img.data);
                        setPopup(true);
                      }}
                    />
                    <div className='card-body m-0'>
                      <div className='row'>
                        <div className='col-9 col-md-7 col-xl-9 text-center'>
                          <h6>
                            <strong> {title}</strong>
                          </h6>
                        </div>
                        <div className='col-3 col-md-5 col-xl-3'>
                          <>
                            <More topic={topic} />
                          </>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
        )}
      </div>

      {fullscreenImage && (
        <Modal isOpen={Popup} toggle={() => setPopup(!Popup)}>
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
    </div>
  );
};
