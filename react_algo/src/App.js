import React, { useState, useEffect } from 'react';
import { Table, Button, Upload, message } from 'antd';
import { UploadOutlined, DeleteOutlined, WindowsFilled } from '@ant-design/icons';
import axios from 'axios';

const { Column } = Table;

const App = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/files')
      .then(response => {
        setFiles(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleUpload = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    axios.post('http://localhost:8000/api/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        setFiles([...files, response.data]);
        message.success('File uploaded successfully');
      })
      .catch(error => {
        console.error(error);
        message.error('Failed to upload file');
      });
  };

  const handleRemove = (id) => {
    axios.delete(`http://localhost:8000/api/files/${id}`)
      .then(response => {
        setFiles(files.filter(file => file.id !== id));
        message.success('File removed successfully');
      })
      .catch(error => {
        console.error(error);
        message.error('Failed to remove file');
      });
      window.location.reload();
  };

  return (
    <div>
      <Upload
        beforeUpload={file => {
          if (file.size > 10 * 1024 * 1024) {
            message.error('File size must be less than 10MB');
            return false;
          }
          handleUpload(file);
          return false;
        }}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />}>Upload File</Button>
      </Upload>
      <Table dataSource={files} rowKey="id">
        <Column title="File Name" dataIndex="filename" />
        <Column title="File Size" dataIndex="size" render={size => `${(size / 1024).toFixed(2)} KB`} />
        <Column title="Uploaded Date" dataIndex="uploadDate" render={date => new Date(date).toLocaleString()} />
        <Column title="Actions" render={(text, record) => (
          <Button icon={<DeleteOutlined />} danger onClick={() => handleRemove(record._id)}>Remove</Button>
        
        )
        
        } />
      </Table>
    </div>
  );
};

export default App;
