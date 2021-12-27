import { lazy } from "react";

// const Loading: React.FunctionComponent<{}> = () => {
//   return <div>loading...</div>;
// };

interface RouterInfo {
  path: string;
  roles?: string | string[];
  component: unknown;
  name?: string;
  exact?: boolean;
}

const BlogCatalog = lazy(() => import("@pages/blog/catalog"));
const BlogCatalogDetail = lazy(() => import("@pages/blog/catalog/detail"));
const Blog = lazy(() => import("@pages/blog/blog-detail"));
const BlogDetail = lazy(() => import("@pages/blog/blog-detail/detail"));
const BlogComments = lazy(() => import("@pages/blog/blog-comment"));
const BlogCommentsDetail = lazy(() => import("@pages/blog/blog-comment/detail"));
const ModulesList = lazy(() => import("@pages/modules/list"));
const ModulesSet = lazy(() => import("@pages/modules/list/detail"));
const MembersComments = lazy(() => import("@pages/members/members-management"));
const MembersCommentsDetail = lazy(() => import("@pages/members/members-management/detail"));


const routeConfigs: RouterInfo[] = [
  {
    path: "/admin/blog-management/blog-catalog",
    roles: "list_user",
    component: BlogCatalog,
  },
  {
    path: "/admin/blog-management/blog-catalog/detail",
    roles: "list_user",
    component: BlogCatalogDetail,
  },
  {
    path: "/admin/blog-management/blog",
    roles: "list_user",
    component: Blog,
  },
  {
    path: "/admin/blog-management/blog/detail",
    roles: "list_user",
    component: BlogDetail,
  },
  {
    path: "/admin/blog-management/blog-comments",
    roles: "list_user",
    component: BlogComments,
  },
  {
    path: "/admin/blog-management/blog-comments/detail",
    roles: "list_user",
    component: BlogCommentsDetail,
  },
  {
    path: "/admin/base-management/module-list",
    roles: "list_user",
    component: ModulesList,
  },
  {
    path: "/admin/base-management/module-list/set",
    roles: "list_user",
    component: ModulesSet,
  },
  {
    path: "/admin/members-management/members-list",
    roles: "list_user",
    component: MembersComments,
  },
  {
    path: "/admin/members-management/members-list/detail",
    roles: "list_user",
    component: MembersCommentsDetail,
  },
];

export default routeConfigs;
