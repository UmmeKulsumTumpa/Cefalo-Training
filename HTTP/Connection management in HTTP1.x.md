# Connection Management in HTTP/1.x

Connection management in HTTP is crucial for the performance of websites and web applications. The way connections are opened, maintained, and closed affects the overall efficiency. In HTTP/1.x, there are different models for managing connections: **short-lived connections**, **persistent connections**, and **HTTP pipelining**.

## Key Concepts:
1. **TCP (Transmission Control Protocol)**: HTTP mostly uses TCP for its transport. It creates a connection between the client and the server. In the early days of HTTP, connections were short-lived, meaning a new connection was opened for every request and closed once the response was received.

<img src="images/http_conn_models.png" alt="http_connection_methods">

2. **Short-Lived Connections**:
   - Every time the client sends a request, a new connection is opened to the server.
   - Once the server responds, the connection is closed.
   - **Drawback**: Opening a new TCP connection each time is resource-intensive. Each connection requires several messages to be exchanged, and network latency can slow things down, especially when a website requires many requests (like modern web pages that often need a dozen or more resources).

   **Example**: 
   - Client -> Open connection to Server -> Send Request -> Receive Response -> Close connection.

3. **Persistent Connections** (HTTP/1.1):
   - In **HTTP/1.1**, persistent connections were introduced. The connection remains open between successive requests, meaning multiple requests can be sent without re-establishing the connection.
   - **Benefit**: Reduces the overhead of opening and closing connections for each request, improving performance.

   **Example**: 
   - Client -> Open connection to Server -> Send multiple requests and receive responses without closing the connection after each one.

4. **HTTP Pipelining** (HTTP/1.1):
   - HTTP pipelining allows several requests to be sent at once without waiting for a response to each one, further reducing network latency.
   - **Benefit**: Speeds up the process by sending multiple requests in parallel and reducing the waiting time for responses.

   **Example**:
   - Client -> Open connection to Server -> Send Request 1, Request 2, Request 3 -> Receive all responses after they’re processed.

5. **Hop-by-Hop Connections**:
   - Connection management applies to each connection between two consecutive nodes (e.g., client and proxy, or proxy and server).
   - This is **hop-by-hop** communication, meaning the connection model between a client and the first proxy might be different from the model between the proxy and the server.
   - **Important Headers**: Headers like **Connection** and **Keep-Alive** define the connection behavior and are **hop-by-hop** headers. These headers can be changed by intermediary nodes like proxies.

    > ### End-to-End Headers vs. Hop-by-Hop Headers
    > 
    > Let’s use a real-life analogy involving a **delivery package** to explain **End-to-End Headers** and **Hop-by-Hop Headers**.
    > 
    > ### End-to-End Headers:
    > Think of **end-to-end headers** like important documents inside a package that need to reach the final destination without being altered along the way.
    > 
    > ### Example:
    > - You order a **birthday gift** from an online store. The package contains a **birthday card** with a personalized message for the recipient. The card must go along with the package, and the **recipient** (the final destination) must receive the card as is, without any changes.
    > 
    > ### How it applies to networking:
    > In this analogy, the **birthday card** represents headers like **Host**, **Content-Type**, or **Cookie** in an HTTP request or response. These headers contain crucial information for the recipient (the server or the client) to process the request properly. The card (header) should not be altered by any **intermediate handlers** (like post offices or delivery companies), and the **recipient** must get it intact.
    > 
    > - **In HTTP**: The **end-to-end headers** must be passed along, unmodified, from the sender (client) to the recipient (server) or vice versa. **Intermediate proxies or caches** should not modify these headers but should simply pass them along.
    > 
    > ### Example in HTTP:
    > - If a request has a `Cookie` header, it should not be altered by any proxies or caches along the way.
    > 
    > ### Hop-by-Hop Headers:
    > Now, imagine **hop-by-hop headers** as specific **instructions** that only need to be followed by the **delivery company handling the package** at each specific step.
    > 
    > ### Example:
    > - You send a **package** to a friend, but inside the package, you’ve included special **delivery instructions** for each of the steps along the way. For example, the first delivery company handling the package must **leave the package at the doorstep** while the second company should **ring the bell**. These instructions apply only to the specific company handling the delivery, and should **not** be passed on to the final recipient.
    > 
    > ### How it applies to networking:
    > In the network, hop-by-hop headers like `Transfer-Encoding` or `Connection` are **only relevant for the transport-level connection between two nodes** (like between the client and a proxy or between a proxy and the server). They are **not** meant to reach the final recipient. These headers may be altered or removed by intermediate proxies, just as the delivery company may follow the specific instructions without passing them on to the recipient.
    > 
    > ### Example in HTTP:
    > - A **proxy server** might modify the **`Connection`** header (a hop-by-hop header) to manage the connection for that specific request, but that header won't be passed to the final server or client.
    > 
    > ### Summary:
    > - **End-to-End Headers**: These are like the **birthday card** in the package, containing important information that must go to the final recipient unchanged. Proxies (the intermediaries) must not modify or remove these headers.
    > - **Hop-by-Hop Headers**: These are like the **delivery instructions** for each step of the journey. They are only meaningful for the specific step (or transport-level connection), and they don’t need to be passed along to the final recipient.
    > 
    > In the context of **HTTP**, **end-to-end headers** are passed directly to the final recipient (server or client), while **hop-by-hop headers** only matter for intermediate nodes (like proxies) and can be modified or dropped.


6. **HTTP Connection Upgrade**:
   - In some cases, an HTTP/1.1 connection can be upgraded to a different protocol, like **TLS/1.0**, **WebSocket**, or even **HTTP/2** (in cleartext).
   - This process is called **HTTP connection upgrade** and allows a more efficient or secure communication.

## Conclusion:
- **Short-lived connections** are inefficient, especially for modern web pages.
- **Persistent connections** and **HTTP pipelining** were introduced in HTTP/1.1 to improve performance by reusing connections and reducing latency.
- **Hop-by-hop connections** refer to the communication between consecutive network nodes, with connection management headers being modifiable by intermediaries.
- The connection upgrade process allows HTTP/1.1 to switch to more advanced protocols like **HTTP/2** for better performance.

---
**Remember**: As technology advanced, **HTTP/2** further improved connection handling, making many of these older techniques (like domain sharding and HTTP pipelining) less necessary.

---

# Short-Lived Connections in HTTP

## What are Short-Lived Connections?

In **HTTP/1.0**, the default behavior is to use **short-lived connections**, meaning:

1. **Each HTTP request opens a new TCP connection.**
2. **Once the response is received, the connection is closed.**
3. **For every new request, a new connection must be established.**

### Why is This Inefficient?
- **Each new connection requires a TCP handshake**, which takes extra time.
- TCP connections **become more efficient over time**, but short-lived connections **do not allow this optimization**.
- Opening and closing connections **repeatedly** increases **latency** and **server load**.

## Example: How HTTP/1.0 Handles Requests
When a browser requests multiple resources (HTML, images, CSS, JavaScript), each request follows this process:

1. **Request:** The browser connects to the server to request `index.html`.
2. **TCP Handshake:** A new TCP connection is established.
3. **Response:** The server sends `index.html` and then **closes the connection**.
4. **Next Request:** The browser connects again for `style.css`, and the cycle repeats.

## Short-Lived Connections in HTTP/1.1
- In **HTTP/1.1**, short-lived connections **are no longer the default**.
- Instead, **persistent connections** are enabled **unless explicitly disabled** using:

  ```http
  Connection: close
  ```

- If this header is set, **HTTP/1.1 behaves like HTTP/1.0**, closing the connection after each request.

## Problems with Short-Lived Connections
- **Additional delay** due to repeated TCP handshakes.
- **Increased server load** from handling unnecessary connections.
- **Slower page loads** for users.

## How HTTP/1.1 Solves This
HTTP/1.1 introduced **persistent connections**, which:
- **Reuse a single TCP connection** for multiple HTTP requests.
- **Reduce latency** and **improve efficiency**.
- Allow **faster page loads** with fewer connection overheads.

## Conclusion
Short-lived connections were the default in **HTTP/1.0**, but they are inefficient. **HTTP/1.1 avoids them unless explicitly requested**, improving performance by keeping connections open for multiple requests. 🚀

---

# Persistent Connections in HTTP

## What Are Persistent Connections?

**Persistent connections** (also called **keep-alive connections**) allow a single TCP connection to remain open for multiple HTTP requests, **reducing the need for repeated TCP handshakes** and improving performance.

### Why Were They Introduced?
Short-lived connections have two major problems:
1. **Time-consuming TCP handshakes**: Establishing a new connection for every request adds significant delay.
2. **TCP performs better with warm connections**: A connection that stays open can **adapt and optimize performance**, but short-lived connections **never get this advantage**.

## How Persistent Connections Work
- Instead of closing after each request, the **same TCP connection is reused** for multiple requests.
- This **reduces latency** and **improves efficiency**.
- The connection **remains open** for some time, but **does not stay open forever**.
- **Idle connections are closed** after a timeout.
- The **Keep-Alive** header can be used by the server to specify how long the connection should stay open:

  ```http
  Keep-Alive: timeout=10, max=100
  ```

  This means:
  - The connection **stays open** for **10 seconds**.
  - A **maximum of 100 requests** can be made before the connection closes.

## Persistent Connections in HTTP Versions

### **HTTP/1.0**
- **Connections are not persistent by default.**
- To enable persistence, the client must explicitly send:

  ```http
  Connection: keep-alive
  ```

### **HTTP/1.1**
- **Persistent connections are enabled by default.**
- The `Connection: keep-alive` header is **not needed**, but it is **often included** for backward compatibility with HTTP/1.0.

## Drawbacks of Persistent Connections
- **Consumes server resources**: Even idle connections use memory and processing power.
- **Can be exploited in DoS (Denial of Service) attacks**: Attackers can keep many connections open to **overwhelm the server**.
- **Under heavy load**, closing idle connections **improves performance**.

## Conclusion
**Persistent connections improve HTTP performance** by keeping TCP connections open for multiple requests, reducing latency and server load. However, they **must be managed properly** to prevent resource exhaustion and security risks.

---

# HTTP Pipelining

## The Problem with Sequential Requests in HTTP/1.1

By default, **HTTP requests are issued sequentially**, meaning:
1. The **browser sends a request** to the server.
2. It **waits for a response** before sending the next request.
3. **Network latency and bandwidth limitations** can cause significant delays.

This becomes inefficient when loading a webpage with multiple resources (e.g., images, CSS, JavaScript). Each request must **wait for the previous one to complete**, leading to **slower page loads**.

## Introducing HTTP Pipelining

**HTTP pipelining** was introduced to improve performance by:
- **Sending multiple requests** over the same **persistent connection** **without waiting** for responses.
- **Reducing latency** by eliminating the delay between consecutive requests.
- **Potentially improving TCP efficiency** by packing multiple requests in the same TCP message.

### How HTTP Pipelining Works

1. The client sends **multiple requests in a row** without waiting for responses.
2. The server processes them **in order** and **sends responses sequentially**.
3. The same **persistent TCP connection** is reused, avoiding the overhead of establishing new connections.

### Example of Pipelining vs. Sequential Requests

#### **Without Pipelining (Sequential Requests)**:
```
Request 1 → Wait → Response 1
Request 2 → Wait → Response 2
Request 3 → Wait → Response 3
```

#### **With Pipelining**:
```
Request 1 → Request 2 → Request 3 → Wait
Response 1 → Response 2 → Response 3
```
Since requests are sent without waiting, the server can **begin processing earlier**, improving efficiency.

## Limitations of HTTP Pipelining

Despite its theoretical benefits, HTTP pipelining **was never widely adopted** due to several issues:

1. **Buggy Proxies Cause Erratic Behavior**  
   - Many HTTP proxies **do not handle pipelining correctly**, leading to **unexpected issues**.
   - This made troubleshooting **difficult for web developers**.

2. **Difficult to Implement Efficiently**  
   - **Request size, network latency, and bandwidth affect performance**.
   - Important requests might get **stuck behind less important ones** (e.g., a large CSS file delaying a critical script).

3. **Head-of-Line Blocking**  
   - If one response is **delayed**, all subsequent responses **must wait**, **reducing efficiency**.

## Why HTTP Pipelining Was Deprecated

Due to these issues, modern browsers **disable pipelining by default**. Instead, HTTP/2 introduced **multiplexing**, which:
- **Solves head-of-line blocking** by allowing **multiple requests and responses to be interleaved**.
- **Handles prioritization better**, ensuring **important resources load first**.
- **Eliminates the need for pipelining** by improving connection efficiency.

## Conclusion

HTTP pipelining was an attempt to speed up HTTP by sending multiple requests **without waiting** for responses. However, due to **implementation issues and head-of-line blocking**, it was **not widely adopted** and has been **superseded by HTTP/2 multiplexing**.

---

# Domain Sharding and Subdomains

## Issue Without Domain Sharding

In the early days of HTTP/1.x, websites faced a significant performance bottleneck because a browser could only open a limited number of connections to a single server. This limitation meant that if a website had several resources like images, JavaScript files, or CSS files, the browser had to load these resources sequentially over a single connection. The number of connections per domain was typically limited to 2-3, meaning that the browser could only download a small number of resources at a time. 

As websites became more complex and included multiple resources, this created a delay in loading time. The process of fetching each resource one after another, as shown in the first diagram of your image, slowed down the page load time, causing inefficiencies.

## Domain Sharding: Mitigating the Issue

**Domain Sharding** is a technique introduced to overcome this limitation and improve website performance. The idea behind domain sharding is to split the website's resources across multiple subdomains, allowing the browser to open multiple connections to the server and load resources in parallel.

### How Domain Sharding Works
In domain sharding, instead of loading all resources from a single domain (e.g., **www.example.com**), the resources are split across multiple subdomains (e.g., **www1.example.com**, **www2.example.com**, etc.). This allows the browser to open multiple connections to each subdomain, enabling the parallel downloading of resources.

For example:
- In a **without domain sharding** setup, all resources are loaded sequentially from **www.example.com**. The browser is restricted by the number of allowed connections (typically 2-3), which means it can only download a limited number of resources at once.
- In **with domain sharding**, the browser can now open 6 connections to each subdomain, significantly increasing the number of parallel connections. This allows multiple resources to be fetched simultaneously from different subdomains, improving the overall loading speed of the webpage.

### Example Without Domain Sharding:

<img src="images/without_domain_sharding.png" alt="without domain sharding" height="300" width="500">

Without domain sharding, all resources (like images) are fetched sequentially using a single domain, limiting the number of parallel connections. The resources are fetched one by one, and time passes as each resource is downloaded.

### Example With Domain Sharding:

<img src="images/with_domain_sharding.png" alt="with domain sharding" height="300" width="500">

With domain sharding, resources are split across multiple subdomains (e.g., **www1.example.com**, **www2.example.com**). The browser can now open 6 connections per domain, allowing resources to be loaded simultaneously. This increases the total number of parallel connections (from 2-3 to 12 in this case), improving the page load time.

## Why Is Domain Sharding Deprecated?

Although domain sharding improved performance in HTTP/1.x, it has been deprecated in favor of HTTP/2 due to its limitations and newer, more efficient methods in HTTP/2.

### Connection Coalescing in HTTP/2
HTTP/2 introduced a more efficient mechanism for handling multiple parallel requests over a single connection. In HTTP/2, resources can be downloaded in parallel without the need to split them across multiple subdomains. This reduces the need for domain sharding, as HTTP/2 can handle parallel requests much more efficiently.

**Connection Coalescing**: Most HTTP/2 implementations use connection coalescing, which allows multiple domains to share a single connection. This eliminates the need for domain sharding and improves performance without the drawbacks of opening multiple connections to different subdomains.

### Problems with Domain Sharding:
1. **Denial of Service (DoS) Protection**: Using domain sharding in HTTP/1.x could trigger issues like **DoS protection** if too many connections are made to the server. This could lead to the server blocking connections or slowing down.
2. **Extra DNS Lookups**: Domain sharding introduces extra **DNS lookups** for each subdomain, adding overhead to the process and reducing the overall performance.

### Best Practice with HTTP/2:
With HTTP/2, it’s better to rely on the protocol's native ability to handle multiple parallel requests over a single connection, which improves performance without the drawbacks of domain sharding.

---

## Domain and Subdomain

A **domain** and **subdomain** are parts of the structure of a website's address (URL) on the internet. Here’s how they work:

### 1. Domain:
A **domain** is the main part of a website's address that identifies the website on the internet. It is used to access a specific website or resource. The domain name usually consists of two main parts:

- **Second-Level Domain (SLD)**: This is the unique name you choose for your website. For example, in **google.com**, "google" is the second-level domain.
- **Top-Level Domain (TLD)**: This is the extension or suffix of the domain. For example, in **google.com**, "com" is the top-level domain (TLD). Other common TLDs include **.org**, **.net**, and country-based TLDs like **.uk** or **.de**.

**Example**: In the URL `www.example.com`, the domain is **example.com**.

### 2. Subdomain:
A **subdomain** is a part of the main domain that can be used to organize different sections or services within a website. A subdomain comes before the main domain, separated by a period (`.`). It allows you to create separate sections of a website without needing a whole new domain.

**Example**:
- `www.example.com` – "www" is the subdomain of the domain "example.com."
- `blog.example.com` – "blog" is a subdomain of the domain "example.com."
- `shop.example.com` – "shop" is another subdomain of the domain "example.com."

### Why Use Subdomains?
Subdomains are useful for organizing content or providing separate areas of a website. They can be used for:
- **Different services**: For example, `mail.example.com` could be used for email services, while `store.example.com` could be used for an online store.
- **Localization**: A website might use subdomains for different languages, such as `en.example.com` for English content and `fr.example.com` for French content.
- **Testing or Development**: Subdomains can be used for staging or development purposes, like `dev.example.com` or `test.example.com`.

### Summary:
- **Domain**: The main address of a website, like **example.com**.
- **Subdomain**: A section or division of the main domain, like **blog.example.com** or **shop.example.com**.
