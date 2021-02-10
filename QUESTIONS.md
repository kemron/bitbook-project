# Questions

## What would you add to your solution if you had more time?

1. A buffering mechanism to the transport component that sits between the websocket which would retrieve packages within a defined interval and merge them in an internal buffer before writing it to the state, this would help to reduce the rate to rerenders.

2. Global Error and Status boundary component which displays a non obstrusive message on events such as loss of connection but a user friendly error display on critical failures.

3. Significanly more test coverage, this is a relatively computation heavy application an very light on visual components, most of which are just display components with no real behaviour of their own, I would use mainly snapshot testing with these elements using `Enzyme` and `Jest` while focusing healivy on the modules that do the heavy lifting.
4. . Setting of content security policy limitations
5. Introduction of a DepthChart
6. Better responsive layout

## What would you have done differently if you knew this page was going to get thousands of views per second vs per week?

1. Do comprehensive call tracing render time analysis of components to assertain where the most value will lie to perform optimizations such as memoization. Whoever giving the frequency of the updates of the elements the numbers of components that would benefit from memoization may be few.

2. Pause connections after use has removed focus from page after and interval, this woudl allow for the conservation of resources on the server end giving but removing some of the overhead of paintaining unprofitable persistent connections.

## How would you track down a performance issue in production? Have you ever had to do this?

This is where proper logging would be invaluable, one may be chasing a performance issue that may be environment based, due to improper configurations, server side bottlenecks or client side computations hogging the main thread. To properly identify the key issue we must first sift through any logs that may rule out problems on the server side. If we have ruled out that possibility and we know that the likelyhood is some malcode on the client then, Then we use the currenlty deployed tag as a jumping point using some sort of stage envionment as a testing ground as it is likely to be the closest to production and we utilize our development tools, looking at heap size growth, render frequency etc.

## Can you describe common security concerns to consider for a frontend developer?

Major security risks that a frontend developer needs to be concerned with are:

1.  The introduction of malicious code into the environment via some sort of XSS vector or via untrusted domains.
2.  The inappropriate storage and handling of authentication tokens on the client side

## How would you improve the Kraken API that you just used?

The live feed of the spot price of the product would be a great addtion
