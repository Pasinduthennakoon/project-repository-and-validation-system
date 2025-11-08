import React, { useState } from "react";
import { Modal, Form, Input, Select, Button, message } from "antd";
import { useAuth } from "../../context/AuthContext";

const { Option } = Select;

const AuthModal = ({ visible, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState("STUDENT");
  const [form] = Form.useForm();
  const { loginUser, signupUser } = useAuth();

  const handleFinish = async (values) => {
    try {
      if (isSignUp) {
        const result = await signupUser(values);
        if (!result.ok) {
          return message.error(result.message);
        }

        message.success(
          result.status === "APPROVED"
            ? "Registration successful! You can log in now."
            : "Request submitted. Awaiting admin approval."
        );

        form.resetFields();
        setIsSignUp(false);
      } else {
        const result = await loginUser(values);
        if (!result.ok) return message.error(result.message);

        message.success(`Logged in successfully as ${result.user.role}`);
        form.resetFields();
        onClose();
      }
    } catch (error) {
      message.error("Something went wrong. Please try again.");
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
            {/* Role selection */}
            <Form.Item label="Role" name="role" initialValue="STUDENT">
              <Select
                onChange={(value) => {
                  setRole(value);
                  form.resetFields(["regNo", "batch"]); // reset student-specific fields when role changes
                }}
              >
                <Option value="STUDENT">Student</Option>
                <Option value="SUPERVISOR">Supervisor</Option>
                <Option value="ADMIN">Admin</Option>
              </Select>
            </Form.Item>

            {/* Name field for all */}
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Enter your name" }]}
            >
              <Input />
            </Form.Item>

            {/* Reg No for STUDENT only */}
            {role === "STUDENT" && (
              <Form.Item
                label="Reg No"
                name="regNo"
                rules={[{ required: true, message: "Enter Reg No" }]}
              >
                <Input />
              </Form.Item>
            )}

            {/* Email for all */}
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Enter your email" }]}
            >
              <Input />
            </Form.Item>

            {/* Batch for STUDENT only */}
            {role === "STUDENT" && (
              <Form.Item
                label="Batch"
                name="batch"
                rules={[{ required: true, message: "Enter Batch" }]}
              >
                <Input />
              </Form.Item>
            )}

            {/* Department for all */}
            <Form.Item
              label="Department"
              name="department"
              rules={[{ required: true, message: "Enter your department" }]}
            >
              <Input />
            </Form.Item>

            {/* Password */}
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Enter your password" }]}
            >
              <Input.Password />
            </Form.Item>

            {/* Confirm password */}
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
          </>
        )}

        {!isSignUp && (
          <>
            {/* Sign In fields */}
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
          </>
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
