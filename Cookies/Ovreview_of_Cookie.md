
# The Story of Cookies: How Lou Montulli Solved a Big Problem  

## The Problem: Web Servers Had No Memory  

Before cookies, web servers had a major limitation:  

> Web servers could not remember users between page visits.  

This created a significant problem for early e-commerce websites like **MCI**, which wanted to implement a **shopping cart system**. The challenges were:  

- If a shopper added an item to their cart and navigated to another page, **the cart would be lost**.  
- Web servers had no built-in way to track users across multiple requests.  
- Storing session data on the server for every user would require **too many resources**, making it inefficient.  

### The Request from MCI  

MCI needed a way to **store shopping cart information on the user's computer** instead of on the server. They approached **Netscape Communications**, where **Lou Montulli** and his team were working on web technologies.  

---

## The Solution: A "Magic Cookie" for the Web  

### Inspiration from Magic Cookies  

Lou Montulli was familiar with a concept in computing called **magic cookies**—small pieces of data that a program receives and sends back unchanged.  

> "Why not store user session data in the browser and send it back to the server when needed?"  

### How Cookies Work  

Montulli and his colleague **John Giannandrea** designed a system where:  

1. When a user visits a website, the **browser stores a small text file (a cookie)** with key information (e.g., shopping cart data).  
2. When the user navigates to a new page on the same site, the **browser automatically sends the cookie back to the server**.  
3. The server reads the cookie and recognizes the user, **maintaining their session** without storing extra data on the server.  

This simple yet effective mechanism solved the **shopping cart problem** and became a fundamental part of web development.  

---

## The First Use of Cookies  

- **October 1994:** Netscape's browser, **Mosaic Netscape 0.9beta**, became the first to support cookies.  
- Initially, cookies were used to **check if a visitor had already been to the Netscape website**.  
- In **1995**, Montulli applied for a **patent** for the cookie technology, which was granted in **1998**.  
- In **October 1995**, **Internet Explorer 2** also added support for cookies.  

---

## Privacy Concerns & Public Awareness  

Initially, cookies were **enabled by default**, and users were **not notified** about their presence. This led to growing privacy concerns.  

### The Rise of Privacy Concerns  

- **February 1996:** The **Financial Times** published an article about cookies, bringing them into the public eye.  
- **1996 & 1997:** The **U.S. Federal Trade Commission (FTC)** held hearings about potential privacy risks.  
- The **Internet Engineering Task Force (IETF)** started working on a formal specification for cookies.  

### The First Attempt to Regulate Cookies  

In **1997**, the IETF published **RFC 2109**, which recommended:  

- **Third-party cookies** (used by advertisers for tracking) should be **disabled by default**.  
- Browsers should provide more **user control over cookies**.  

However, **Netscape and Internet Explorer ignored these recommendations**, allowing tracking cookies to become a common practice.  

---

## Evolution of Cookie Standards  

Over time, several updates were made to cookie specifications:  

- **RFC 2965 (2000):** Introduced `Set-Cookie2`, but it was rarely used.  
- **RFC 6265 (2011):** Defined cookies based on how they were actually used in real-world applications. The `Set-Cookie2` header was officially deprecated.  

---

## Conclusion: A Simple Fix That Changed the Web  

Cookies were invented to **solve a simple problem**—helping websites remember users. However, they quickly became a tool for **tracking and advertising**, leading to ongoing debates about privacy.  

Despite these concerns, **cookies revolutionized the web** by enabling:  

- **Shopping carts and user sessions**  
- **Personalized content**  
- **Persistent logins**  

Lou Montulli's innovation **transformed the web**, making it more interactive and user-friendly while also sparking discussions about data privacy that continue today.  

---

# Using HTTP Cookies  

## What Are Cookies?  

A **cookie** (also known as a web or browser cookie) is a small piece of data that a server sends to a user's browser. The browser can:  

- **Store cookies**  
- **Create new cookies**  
- **Modify existing cookies**  
- **Send them back to the server** with future requests  

Since **HTTP is stateless**, cookies allow web applications to **store limited data** and remember user information between requests.  

---

## What Cookies Are Used For  

Cookies help servers identify if multiple requests come from the **same user** and respond accordingly.  

### Example: A Simple Sign-In System  

1. **User signs in** → Sends credentials to the server (e.g., via a form).  
2. **Server verifies credentials** → If correct, it:  
   - Updates the UI to show the user is signed in.  
   - Sends back a **cookie** containing a **session ID**.  
3. **User navigates to a new page** → The browser automatically sends the session cookie with the request.  
4. **Server checks session ID**:  
   - If valid → User stays signed in and sees a **personalized page**.  
   - If invalid → Session is deleted, and the user sees a **generic page** or an "Access Denied" message.  

---

## Main Uses of Cookies  

1. **Session Management**  
   - Keeps track of user sign-in status, shopping cart contents, game scores, and other session-related data.  

2. **Personalization**  
   - Stores user preferences like language settings, UI themes, or dark mode.  

3. **Tracking**  
   - Records user behavior for analytics and advertising purposes.  

Cookies play a crucial role in **enhancing user experience** but also raise **privacy and security concerns**, which must be handled with care.  

---

# Data Storage and Cookies  

## Early Use of Cookies for Storage  

In the early web days, **cookies were used for general client-side data storage** because there were no better options. However, modern web development recommends **Storage APIs** instead of cookies.  

## Modern Alternatives  

### 1. **Web Storage API**  
- **`localStorage`**: Stores data with no expiration.  
- **`sessionStorage`**: Stores data only for the session (deleted when the tab is closed).  

### 2. **IndexedDB**  
- A low-level database for storing **structured data**, including large datasets.  

## Why Storage APIs Are Better  

1. **No Unnecessary Data Transfer**  
   - Storage APIs **never send data to the server**.  
   - Cookies, however, **are sent with every request**, which can **hurt performance** (especially on slow connections).  

2. **Larger Storage Capacity**  
   - Cookies are **limited per domain** (usually a few hundred cookies).  
   - **Each cookie** is **restricted to ~4KB** of data.  
   - Storage APIs can **store much larger amounts of data**.  

---

## Viewing Stored Data in Browsers  

You can inspect stored cookies and other storage using:  

- **Firefox Developer Tools** → Storage Inspector  
- **Chrome Developer Tools** → Application Panel  

Using modern storage APIs improves performance and **reduces unnecessary data transfer** compared to cookies.  
