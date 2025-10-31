## Quick orientation

- Stack: React + TypeScript + Vite (plugin: `@vitejs/plugin-react-swc`). Entry: `src/main.tsx` -> `src/App.tsx`.
- Dev: run `npm i` then `npm run dev` (Vite server, port 3000 by default). Build: `npm run build`.
- Import alias: `@` maps to `./src` (see `vite.config.ts`). Use `@/components/...` when adding cross-cutting imports.

## Architecture & important files

- `src/App.tsx` — main layout, routing-like view switching, and where `PermissionGuard` wraps most pages. Use it to find top-level views and their module keys.
- `src/contexts/AuthContext.tsx` — central auth + RBAC implementation. It stores session in `localStorage` under `auth_user` and exports `MOCK_USERS` / `MOCK_PASSWORDS` for local testing. New auth-related changes should keep compatibility with `MENU_MODULE_MAP` and `ROLE_PERMISSIONS` shape.
- `vite.config.ts` — contains many dependency alias mappings (do not rename packages arbitrarily; follow the aliases). Vite server runs on port 3000 and opens browser by default.

## Patterns & conventions for code changes

- Navigation is not using react-router: App uses an internal `activeView` union type; change view strings and ensure `MENU_MODULE_MAP` and `ROLE_PERMISSIONS` are updated in `AuthContext` to maintain RBAC.
- Permissions: each module key has boolean flags {canView, canCreate, canEdit, canDelete}. When adding a new feature page, add its module key to `ROLE_PERMISSIONS` and `MENU_MODULE_MAP`.
- Session persistence: `AuthContext` reads/writes `localStorage` `auth_user`. Tests or tools that reset auth should clear this key.
- UI primitives live under `src/components/ui/` — prefer those building blocks (Button, Input, Dialog) rather than adding new ad-hoc styles.

## Integration points & external dependencies

- Supabase client is included as `@jsr/supabase__supabase-js` in `package.json`; check `supabase/` folder for server-side functions and integration patterns.
- Global toast notifications use `sonner` (wrapped at `components/ui/sonner`). Keep notification UX consistent via that wrapper.

## Helpful examples / copy-paste snippets

- Example: log in locally using the built-in mock accounts (see `AuthContext.tsx`):
  - Email: `superadmin@sawit.com`, Password: `super123` (super admin with full access)

- Example: new view registration (follow App.tsx):
  - Add a view string to App's ViewType union, create component in `src/components/`, then render it inside App's content area wrapped with `<PermissionGuard module="your_module_key">`.

### Example: add a new view (exact places to edit)

1. Add the view id to the `ViewType` union in `src/App.tsx`:

```ts
type ViewType = 'dashboard' | 'my-new-view' | /* ... */
```

2. Create `src/components/MyNewView.tsx` and export a default React component.

3. Register the module key in `src/contexts/AuthContext.tsx`:

```ts
// MENU_MODULE_MAP
MENU_MODULE_MAP['my-new-view'] = 'my_new_module';

// ROLE_PERMISSIONS (add to each role as appropriate)
ROLE_PERMISSIONS.super_admin['my_new_module'] = { module: 'my_new_module', canView: true, canCreate: true, canEdit: true, canDelete: true };
```

4. Render it in `App.tsx` behind the `PermissionGuard`:

```tsx
{activeView === 'my-new-view' && (
  <PermissionGuard module="my_new_module">
    <MyNewView />
  </PermissionGuard>
)}
```

## What to avoid / gotchas

- Don’t assume react-router is present; changing navigation should follow the existing `activeView` pattern unless you intentionally migrate the app to a router — if you do, update RBAC/menu mapping accordingly.
- Avoid changing Vite aliases in `vite.config.ts` without checking imports across `src/` — many components rely on the `@` alias and explicit package aliases.

## Developer workflows & quick commands

- Install and run dev server:

```powershell
cd "C:\Users\Andy\OneDrive - PT Iweka Digital Solusi\Sigma\Sigmapayrollwebdesign"
npm i
npm run dev
```

- Build for production: `npm run build`.

- Note: the repo currently has no test, lint, or CI config files; expect to add any linters or test runners if you need them.

## Where to look when debugging

- Start here: `src/contexts/AuthContext.tsx` for auth failures, `src/App.tsx` for view routing, and `vite.config.ts` for module resolution issues.
- For UI inconsistencies, check `src/components/ui/*` and `src/components/*` for layout wrappers like `Sidebar` and `Navbar`.

If any part is unclear or you want me to expand a section (e.g., low-level lint/build commands, tests, or CI wiring), tell me which area and I will iterate.
