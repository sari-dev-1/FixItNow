import "../css/Login.css";
import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex,Layout } from 'antd';
import { updateName, updateRole } from "../Store/UserSlice";
import { useDispatch } from 'react-redux';
import { Link,useNavigate} from 'react-router-dom';

const Login = () => {
  const [form] = Form.useForm(); // מוסיפים את form instance
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await fetch("http://localhost:8080/User/getUserbyName/" + values.username, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      const result = await response.json();
      console.log("התגובה מהשרת:", result);

      if (result.password === values.password) {
        dispatch(updateName(result.name));
        dispatch(updateRole(result.role));
      } else {
        // קביעת שגיאה בשדה הסיסמה
        form.setFields([
          {
            name: 'password',
            errors: ['סיסמה שגויה. נסה שוב.'],
          },
        ]);
      }
      navigate("/HomePage");
    } catch (err) {
      console.error("שגיאה בשליחה לשרת:", err);
    }
  };

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    handleSubmit(values);
  };

  return (
    <Layout
            style={{
                minHeight: '85vh',
                width: '100vw',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                margin: 0,
                background:'rgb(226, 226, 226)',
                justifyContent: 'center',
                flexDirection:'row',
                 flexWrap: 'wrap',
                alignContent: 'center'
            }}
        >

<div style={{ direction: 'rtl', textAlign: 'right',padding: '3%',backgroundColor:'white',width:'30vw',height:'50vh',borderRadius:'10px' }}>
      <Form
        form={form} // מחברים את ה־form instance
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        onFinish={onFinish}
      >
        <div className="loginFont">כניסה</div>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'הכנס את שמך בבקשה!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="שם משתמש" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'הכנס סיסמא בבקשה!' }]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="סיסמא" />
        </Form.Item>

        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>זכור אותי</Checkbox>
            </Form.Item>
            <a href="">שכחת סיסמא?</a>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            כניסה
          </Button>
          או  
          <Link to={`/SignIn`} >
          {/* או <div>הרשם עכשיו</div> */}
        <a href="">  הרשם עכשיו</a>
          </Link>
          
        </Form.Item>
      </Form>
    </div>

        </Layout>
    
  );
};

export default Login;
