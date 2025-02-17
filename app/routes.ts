import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("layouts/public-layout.tsx", [
    route("login", "routes/login.tsx"),
    route("register", "routes/register.tsx"),
  ]),
  route("logout", "routes/logout.tsx"),
  layout("layouts/protected-layout.tsx", [
    layout("layouts/dashboard-layout.tsx", [
      route("dashboard", "routes/dashboard.tsx"),
      ...prefix("users", [
        index("routes/user/user-page.tsx"),
        route("edit/:id", "routes/user/user-edit.tsx"),
      ])
    ])
  ]),
] satisfies RouteConfig;
