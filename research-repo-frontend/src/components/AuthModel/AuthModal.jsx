import React, { useState } from "react";
import { Modal, Form, Input, Select, Button, message } from "antd";
import { useAuth } from "../../context/AuthContext";

const { Option } = Select;

const AuthModal = ({ visible, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState("STUDENT");
  const [form] = Form.useForm();
  const { loginUser, signupUser } = useAuth();

  const handleFinish = (values) => {
    if (isSignUp) {
      const result = signupUser({ ...values, role });
      if (!result.ok) {
        message.error(result.message);
      } else {
        message.success(
          result.status === "APPROVED"
            ? "Registration successful! You can log in now."
            : "Request submitted. Awaiting admin approval."
        );
        form.resetFields();
        setIsSignUp(false);
      }
    } else {
      const result = loginUser(values);
      if (!result.ok) {
        message.error(result.message);
      } else {
        message.success(`Logged in successfully as ${result.user.role}`);
        form.resetFields();
        onClose(); // ✅ closes modal instantly
      }
    }
  };

  return (
    <Modal
      title={isSignUp ? "Sign Up" : "Sign In"}
      open={visible}
      onCancel={() => {
        onClose();
        form.resetFields();
      }}
      footer={null}
      centered
      destroyOnClose
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        {isSignUp && (
          <>
            <Form.Item label="Role" name="role" initialValue="STUDENT">
              <Select onChange={setRole}>
                <Option value="STUDENT">Student</Option>
                <Option value="SUPERVISOR">Supervisor</Option>
                <Option value="ADMIN">Admin</Option>
              </Select>
            </Form.Item>

            {(role === "STUDENT" || role === "SUPERVISOR") && (
              <Form.Item
                label="Reg No"
                name="regNo"
                rules={[{ required: true, message: "Enter Reg No" }]}
              >
                <Input />
              </Form.Item>
            )}

            {role === "STUDENT" && (
              <Form.Item
                label="Batch"
                name="batch"
                rules={[{ required: true, message: "Enter Batch" }]}
              >
                <Input />
              </Form.Item>
            )}
          </>
        )}

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Enter your email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Enter your password" }]}
        >
          <Input.Password />
        </Form.Item>

        {isSignUp && (
          <Form.Item
            label="Confirm Password"
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value)
                    return Promise.resolve();
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        )}

        <Button type="primary" htmlType="submit" className="w-full mt-2">
          {isSignUp ? "Sign Up" : "Sign In"}
        </Button>

        <p className="text-center text-sm mt-3">
          {isSignUp ? "Already have an account? " : "Don’t have an account? "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </Form>
    </Modal>
  );
};

export default AuthModal;
