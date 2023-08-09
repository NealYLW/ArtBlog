import React, { useState, useEffect } from 'react';
import { Button, Form, Input, List, Upload, message, notification, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import  axiosInstance  from '../../request/index.jsx';
import { useSelector, useDispatch } from 'react-redux';
import {fetchPaintings, addPainting as addPaintingAction,
  updatePainting as updatePaintingAction, deletePainting as deletePaintingAction} from '../../actions/paintingsActions.jsx';  

const Paintings = () => {
  // Add a new state variable to keep track of the file list
  // file list is the list of files that are currently being uploaded
  const [fileList, setFileList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingFileList, setEditingFileList] = useState([]);
  const [form] = Form.useForm();
  const [editingForm] = Form.useForm();

  const handleUpload = ({fileList}) => {
    setFileList(fileList);
  }

  const handleEditUpload = ({fileList}) => {
    setEditingFileList(fileList);
  }

  const startEditing = (id, title, description) => {
    setEditingId(id);
    editingForm.setFieldsValue({ title, description });
  }

  // Get the user ID from Redux store
  const userId = localStorage.getItem('userId');

  const dispatch = useDispatch();
  // Instead of useState, get the paintings from Redux store
  const paintings = useSelector(state => state.paintings.data); // this path depends on your store structure
  const errorMessage = useSelector(state => state.paintings.error); // if you want to show error messages

  // Fetch the paintings when the component mounts
  useEffect(() => {
      dispatch(fetchPaintings(userId)); // assuming you have userId available
  }, [dispatch]);

  const addPainting = (values) => {
    console.log('Component Values:', values);
    console.log('Component FileList:', fileList);
    console.log('Component UserID:', userId);
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      if (fileList.length > 0) {
          formData.append('image', fileList[0].originFileObj);
      }
      dispatch(addPaintingAction(values, fileList, userId)); // dispatch the action instead of direct API call
      form.resetFields();
  }

  const deletePainting = (id) => {
      dispatch(deletePaintingAction(userId, id));
  }

  const updatePainting = (values) => {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      if (editingFileList.length > 0) {
          formData.append('image', editingFileList[0].originFileObj);
      }
      dispatch(updatePaintingAction(userId, editingId, formData));
      setEditingId(null);
      setEditingFileList([]);
  }
  return (
    <div>
      <h2>Your Paintings</h2>
      {console.log('Paintings Data:', paintings)}
      <List
        itemLayout="horizontal"
        dataSource={paintings}
        renderItem={item => {
          
          if (!item) return null;  // Skip rendering undefined or null items
          return(
          <List.Item
            actions={[
              <Button type="primary" onClick={() => deletePainting(item.id)}>Delete</Button>,
              editingId === item.id ? (
                <Button onClick={() => setEditingId(null)}>Cancel</Button>
              ) : (
                <Button onClick={() => startEditing(item.id, item.title, item.description)}>Edit</Button>
              )
            ]}
          >
            {editingId === item.id ? (
              <Form form={editingForm} layout="vertical" onFinish={updatePainting}>
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
                  <Button type="primary" htmlType="submit">Update Painting</Button>
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
          );
        }}
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