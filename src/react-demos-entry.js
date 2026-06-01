/** @jsxImportSource react */
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import * as demos from "./routes/posts/use_state_should_require_a_dependency_array/react_bad.react.jsx";
import * as cloudflare from "./routes/posts/how_much_of_that_cloudflare_outage_was_useeffects_fault/use_effect_bad.react.tsx";

window.React = React;
window.ReactDOM = ReactDOM;
window._reactDemos = {
  BadTodoApp1: demos.BadTodoApp1,
  BadTodoAppWithKey: demos.BadTodoAppWithKey,
  BadTodoAppWithDeps: demos.BadTodoAppWithDeps,
  UseEffectBad: cloudflare.UseEffectBad,
};
