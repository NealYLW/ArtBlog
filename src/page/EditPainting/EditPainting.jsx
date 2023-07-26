import React, { useState, useEffect } from 'react';
import { Button, Form, Input, List, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import  axiosInstance  from '../../request/index.jsx';

const Paintings = () => {
  const [paintings, setPaintings] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  
  const handleUpload = ({fileList}) => {
    setFileList(fileList);
    }

  const fetchPaintings = () => {
    // Fetch the paintings from your server and update the state
    // You need to implement this function in your server code



    axiosInstance.get(`/users/4/paintings`)
      .then(response => {
        setPaintings(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch paintings:', error);
      });
  }

  const addPainting = (values) => {
    // Send a POST request to your server to add a new painting
    // You need to implement this function in your server code
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    // Add the file to the request body
    if (fileList.length > 0) {
        formData.append('image', fileList[0].originFileObj);
    }
    axiosInstance.post(`/users/4/paintings`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        // Fetch the paintings again to update the list
        fetchPaintings();
      })
      .catch(error => {
        console.error('Failed to add painting:', error);
      });
    }

  const deletePainting = (id) => {
    // Send a DELETE request to your server to delete a painting
    // You need to implement this function in your server code
    axiosInstance.delete(`/users/4/paintings/${id}`)
      .then(response => {
        // Fetch the paintings again to update the list
        fetchPaintings();
      })
      .catch(error => {
        console.error('Failed to delete painting:', error);
      });
  }

  // Fetch the paintings when the component mounts
  useEffect(() => {
    fetchPaintings();
  }, []);

  return (
    <div>
      <h2>Your Paintings</h2>
      <List
        itemLayout="horizontal"
        dataSource={paintings}
        renderItem={item => (
          <List.Item
            actions={[
              <Button type="primary" onClick={() => deletePainting(item.id)}>Delete</Button>,
              // You'll need to add an "Edit" button here that shows a form for editing the painting
            ]}
          >
            <List.Item.Meta
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      />
      <h2>Add a New Painting</h2>
      <Form form={form} layout="vertical" onFinish={addPainting}>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Upload">
        <Upload.Dragger 
            name="file" 
            fileList={fileList} 
            onChange={handleUpload} 
            beforeUpload={() => false} //stop automatic upload when file is selected.
            >
            <p className="ant-upload-drag-icon">
                <UploadOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
        </Upload.Dragger>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Add Painting</Button>
        </Form.Item>
      </Form>
    </div>
  );
};


export default Paintings;