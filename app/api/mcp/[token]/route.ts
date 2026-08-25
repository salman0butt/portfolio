import {
  DELETE as rootDelete,
  GET as rootGet,
  OPTIONS as rootOptions,
  POST as rootPost,
} from '../route';

// The root MCP handler validates /api/mcp/:token directly, so keep the
// configured ChatGPT connector URL stable and do not rewrite it to a query.
export const GET = rootGet;
export const POST = rootPost;
export const DELETE = rootDelete;
export const OPTIONS = rootOptions;
