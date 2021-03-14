# Questions/Things to consider

## What's missing?

1. A buffering mechanism to the transport component that sits between the websocket which would retrieve packages within a defined interval and merge them in an internal buffer before writing it to the state, this would help to reduce the rate to re-renders.

2. Global Error and Status boundary component which displays a non-obstrusive message on events such as loss of connection but a user-friendly error display on critical failures.

3. Significantly more test coverage, this is a relatively computation-heavy application and very light on visual components, most of which are just display components with no real behavior of their own, I would use mainly snapshot testing with these elements using `Enzyme` and `Jest` while focusing heavily on the modules that do the heavy lifting.

5. Introduction of a depth chart
6. Better responsive layout

## Optimization considerations?

1. Do comprehensive call tracing render time analysis of components to ascertain where the most value will lie to perform optimizations such as memoization. Whoever giving the frequency of the updates of the elements the numbers of components that would benefit from memoization may be few.

2. Pause connections after the user has removed the focus from the page after an interval, this would allow for the conservation of resources on the server end giving but removing some of the overhead of maintaining unprofitable persistent connections.


## Api Improvements?

- The live feed of the spot price of the product would be a great addition
- Percentage spot price changes over the past 24 hours
