import React, { useState, useEffect } from 'react';
import { Button, Form, Input, List, Upload, message, notification, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axiosInstance from '../../request/index.jsx';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingFileList, setEditingFileList] = useState([]);
  const [form] = Form.useForm();
  const [editingForm] = Form.useForm();

  const handleUpload = ({ fileList }) => {
    setFileList(fileList);
  }

  const handleEditUpload = ({ fileList }) => {
    setEditingFileList(fileList);
  }

  const openNotification = (type, message) => {
    notification[type]({
      message: message,
    })
  }
  
  const fetchVideos = () => {
    axiosInstance.get(`/users/4/videos`)
      .then(response => {
        setVideos(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch videos:', error);
      });
  }

  const addVideo = (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    if (fileList.length > 0) {
        formData.append('video', fileList[0].originFileObj);
    }
    axiosInstance.post(`/users/4/videos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        fetchVideos();
        form.resetFields();
        openNotification('success', 'Video added successfully!');
      })
      .catch(error => {
        console.error('Failed to add video:', error);
        openNotification('error', 'Failed to add video!');
      });
    }

  const deleteVideo = (id) => {
    axiosInstance.delete(`/users/4/videos/${id}`)
      .then(response => {
        fetchVideos();
      })
      .catch(error => {
        console.error('Failed to delete video:', error);
      });
  }

  const startEditing = (id) => {
    setEditingId(id);
  }

  const stopEditing = () => {
    setEditingId(null);
  }

  const updateVideo = (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    if (editingFileList.length > 0) {
      formData.append('video', editingFileList[0].originFileObj);
    }
    axiosInstance.put(`/users/4/videos/${editingId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        fetchVideos();
        setEditingId(null);
        setEditingFileList([]);
      })
      .catch(error => {
        console.error('Failed to update video:', error);
      });
  }

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div>
      <h2>Your Videos</h2>
      <List
        itemLayout="horizontal"
        dataSource={videos}
        renderItem={item => (
          <List.Item
            actions={[
              <Button type="primary" onClick={() => deleteVideo(item.id)}>Delete</Button>,
              editingId === item.id ? (
                <Button onClick={() => setEditingId(null)}>Cancel</Button>
              ) : (
                <Button onClick={() => startEditing(item.id, item.title, item.description)}>Edit</Button>
              )
            ]}
          >
            {editingId === item.id ? (
              <Form form={editingForm} layout="vertical" onFinish={updateVideo}>
                <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                  <Input.TextArea />
                </Form.Item>
                <Form.Item label="Upload">
                  <Upload.Dragger name="file" fileList={editingFileList} onChange={handleEditUpload} beforeUpload={() => false}> 
                    <p className="ant-upload-drag-icon">
                      <UploadOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  </Upload.Dragger>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">Update Video</Button>
                </Form.Item>
              </Form>
            ) : (
              <>
                <List.Item.Meta
                  title={item.title}
                  description={item.description}
                />
                <Image
                  width={200}
                  src={`http://localhost:3000/uploads/${item.image_url}`}
                />
              </>
            )}
          </List.Item>
        )}
      />
      <h2>Add a New Video</h2>
      <Form form={form} layout="vertical" onFinish={addVideo}>
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
            beforeUpload={() => false}
            >
            <p className="ant-upload-drag-icon">
                <UploadOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
        </Upload.Dragger>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Add Video</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Videos;