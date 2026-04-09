import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import LoginPage from "./Login";

vi.mock("axios");

describe("Login Page", () => {
  test("menampilkan error jika form kosong", () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(
      screen.getByText("Email atau username wajib diisi"),
    ).toBeInTheDocument();
  });

  test("menampilkan error jika password kurang dari 6 karakter", () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>,
    );

    fireEvent.change(
      screen.getByPlaceholderText("Masukkan email atau username"),
      {
        target: { value: "heru@gmail.com" },
      },
    );

    fireEvent.change(screen.getByPlaceholderText("Masukkan password"), {
      target: { value: "123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(screen.getByText("Password minimal 6 karakter")).toBeInTheDocument();
  });

  test("login sukses memanggil API", async () => {
    axios.post.mockResolvedValue({
      data: { message: "Login berhasil" },
    });

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>,
    );

    fireEvent.change(
      screen.getByPlaceholderText("Masukkan email atau username"),
      {
        target: { value: "heru@gmail.com" },
      },
    );

    fireEvent.change(screen.getByPlaceholderText("Masukkan password"), {
      target: { value: "admin1234" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:5000/api/login",
      {
        email: "heru@gmail.com",
        password: "admin1234",
      },
      {
        withCredentials: true,
      },
    );
  });
});
