// src/index.tsx
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { RootLayout } from "./RootLayout"
import "./globals.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <RootLayout>
        {/* TODO: Replace with your app routes or main component */}
        <div className="p-6 text-center">Hello MotoMaintain</div>
      </RootLayout>
    </BrowserRouter>
  </React.StrictMode>
)
