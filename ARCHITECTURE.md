# Angular Enterprise Architecture

Complete enterprise-grade Angular application scaffold with best practices, scalable folder structure, and modern Angular patterns.

## 📁 Project Structure

```
src/
├── app/
│   ├── core/                    # Singleton services & global configuration
│   │   ├── guards/              # Route guards (auth, role-based, etc.)
│   │   ├── interceptors/        # HTTP interceptors (auth, error handling, loading)
│   │   ├── services/            # Core services (Auth, API, Notifications)
│   │   ├── models/              # Core TypeScript interfaces/types
│   │   └── core.config.ts       # Core module providers
│   │
│   ├── shared/                  # Reusable utilities & components
│   │   ├── components/          # Shared standalone components (Header, Footer, etc.)
│   │   ├── directives/          # Reusable directives (Highlight, etc.)
│   │   ├── pipes/               # Custom pipes (FormatDate, Truncate, etc.)
│   │   ├── utils/               # Utility functions (validators, helpers, formatters)
│   │   ├── types/               # Shared TypeScript types
│   │   └── material-ui.ts       # Material Design re-exports
│   │
│   ├── features/                # Feature modules (lazy-loaded)
│   │   ├── dashboard/           # Dashboard feature
│   │   │   ├── pages/           # Route-level components
│   │   │   ├── components/      # Feature-specific components
│   │   │   ├── services/        # Feature business logic
│   │   │   ├── models/          # Feature-specific types
│   │   │   ├── store/           # Feature state (signals)
│   │   │   └── dashboard.routes.ts
│   │   │
│   │   ├── users/               # Users feature with CRUD
│   │   └── settings/            # Settings feature
│   │
│   ├── layouts/                 # Global layout components
│   │   └── admin-layout/        # Main app layout with sidebar
│   │
│   ├── app.ts                   # Root component
│   ├── app.routes.ts            # Main routing configuration
│   └── app.config.ts            # Application configuration & providers
│
├── environments/                # Build configuration
│   ├── environment.ts           # Development
│   ├── environment.development.ts
│   └── environment.prod.ts      # Production
│
├── styles/                      # Global SCSS files (optional)
├── styles.scss                  # Main global styles
└── index.html                   # HTML entry point

```

## 🏗️ Architecture Principles

### Core Module
- **Purpose**: Singleton services and global configuration
- **Services**: Auth, API, Notifications
- **Guards**: Authentication and authorization
- **Interceptors**: HTTP error handling, auth tokens, loading states
- **Scope**: Application-wide (imported once in app config)

### Shared Module
- **Purpose**: Reusable components, pipes, directives, utilities
- **Components**: Header, Footer, Loading Spinner, Dialogs (stateless)
- **Utilities**: Validators, formatters, helpers, constants
- **Pipes**: FormatDate, Truncate, SafeHtml
- **Scope**: Can be imported by any component

### Features Modules
- **Purpose**: Self-contained business logic by feature
- **Structure**: Each feature has its own models, services, components, state
- **Routing**: Lazy-loaded via child routes
- **State**: Using Angular signals for reactive state
- **Scope**: Feature-specific (not shared across features)

### Layouts
- **Purpose**: Common UI structure (header, sidebar, footer)
- **Pattern**: Parent component wrapping router-outlet
- **Usage**: Applied via parent route with children

## 🚀 Key Technologies

- **Angular 21.2.0** - Latest standalone components and signals
- **Material Design 21.2.0** - UI components
- **TypeScript 5.9.2** - Strict type checking
- **Signals** - Reactive state management
- **Lazy Loading** - Feature routes loaded on demand
- **Standalone Components** - Modern Angular pattern (no NgModules)
- **Reactive Forms** - Type-safe form handling
- **RxJS 7.8.0** - Reactive programming

## 📋 Core Features Implemented

### Authentication Service
```typescript
// src/app/core/services/auth.service.ts
- login(credentials): Promise<User>
- logout(): void
- getToken(): string | null
- isAuthenticated: signal<boolean>
- user: computed<User | null>
```

### API Service
```typescript
// src/app/core/services/api.service.ts
- get<T>(endpoint): Promise<T>
- post<T>(endpoint, body): Promise<T>
- put<T>(endpoint, body): Promise<T>
- delete<T>(endpoint): Promise<T>
- getPaginated<T>(endpoint, params): Promise<PaginatedResponse<T>>
```

### HTTP Interceptors
- **AuthInterceptor**: Adds Bearer token to requests, handles 401 errors
- **LoadingInterceptor**: Tracks loading states

### Route Guards
- **authGuard**: Protects routes, redirects to login if not authenticated

### Notification Service
```typescript
- show(message, type, duration)
- success(message) | error(message) | warning(message) | info(message)
- dismiss(id) | dismissAll()
```

## 🎯 Features Structure

### Dashboard Feature
- Overview page with metrics and activities
- Dashboard metric display component
- Service for fetching dashboard data
- Signal-based state management

### Users Feature
- User list with pagination and filtering
- User creation form
- User edit/detail view
- CRUD operations
- Status badges and role management

### Settings Feature
- Application theme settings
- Notification preferences
- Language selection
- LocalStorage persistence

## 🔄 State Management Pattern

Using **Angular Signals** with factory functions:

```typescript
// Feature state management
export function createDashboardSignals() {
  const store = signal<DashboardStore>(initialState);
  
  return {
    store: store.asReadonly(),
    data: computed(() => store().data),
    isLoading: computed(() => store().isLoading),
    setLoading: (loading) => { /* ... */ },
    setData: (data) => { /* ... */ },
  };
}

// Usage in component
private store = createDashboardSignals();
readonly data = this.store.data;  // Computed signal
readonly isLoading = this.store.isLoading;
```

## 🛠️ Utility Functions

### Validators
- `CustomValidators.emailDomain(domain)` - Validate email domain
- `CustomValidators.passwordStrength()` - Strong password validation
- `CustomValidators.match(fieldName)` - Field matching (e.g., password confirmation)

### Formatters
- `DateFormatter.format(date, format)` - Format dates (short/long/full)
- `StringFormatter.truncate(text, length)` - Truncate strings
- `StringFormatter.toTitleCase(text)` - Convert to title case

### Helpers
- `ArrayHelpers.unique(array)` - Get unique items
- `ArrayHelpers.groupBy(array, key)` - Group array by key
- `ArrayHelpers.chunk(array, size)` - Split into chunks
- `ObjectHelpers.deepClone(obj)` - Deep clone objects
- `AsyncHelpers.debounce(func, delay)` - Debounce function
- `AsyncHelpers.throttle(func, limit)` - Throttle function

## 📦 Shared Components

### Header Component
- Application toolbar with user menu
- Navigation
- Sidebar toggle
- **Output**: `toggleSidebar`

### Footer Component
- Copyright and branding
- OnPush change detection

### Loading Spinner Component
- Material-based loading indicator
- Used throughout app for async operations

### Confirm Dialog Component
- Material dialog for confirmations
- Customizable title, message, buttons
- Type support (warning, error, info)

## 🎨 Custom Pipes

- `appFormatDate` - Format dates with different options
- `appTruncate` - Truncate long text with ellipsis
- `appSafeHtml` - Safely render HTML (bypasses XSS protection)

## 🎯 Custom Directives

- `appHighlight` - Highlight elements on hover with configurable color

## 🔐 Security Features

- **HTTPS enforced** in production environment
- **Bearer token authentication** with secure storage
- **Auto-logout** on 401 responses
- **XSS protection** with DomSanitizer
- **Strict TypeScript** mode enabled
- **Strict template checking** for templates

## 📱 Change Detection Strategy

All components use `ChangeDetectionStrategy.OnPush` for:
- Better performance
- Reduced change detection cycles
- Explicit control over updates

## 🚦 Routing Configuration

```typescript
// Main routes with lazy loading
- /dashboard (lazy loaded)
- /users (lazy loaded)
  - /users (list)
  - /users/create (form)
  - /users/:id (edit)
- /settings (lazy loaded)
- /auth (for login, logout)
```

Routes with `canActivate: [authGuard]` are protected.

## 🌍 Environment Configuration

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
};
```

Build with `--configuration production` to use `environment.prod.ts`.

## 📝 Models & Types

### Core Models
- `User`, `LoginRequest`, `LoginResponse`
- `ApiError`, `AppError`
- `ApiResponse<T>`, `PaginatedResponse<T>`

### Feature Models
- `DashboardMetric`, `DashboardData`, `Activity`
- `UserItem`, `UserDetail`, `CreateUserRequest`, `UpdateUserRequest`
- `AppSettings`, `ThemeSettings`

## 🔗 Lazy Loading

Features are lazy-loaded via `loadChildren`:

```typescript
{
  path: 'users',
  loadChildren: () => 
    import('./features/users/users.routes')
      .then(m => m.usersRoutes)
}
```

This reduces initial bundle size and improves user experience.

## 📊 Material Design Integration

Material components pre-configured:
- Toolbar, Sidenav, Cards, Tables
- Forms with Material styling
- Icons, Buttons, Dialogs
- Pagination, Theming

See [material-ui.ts](src/app/shared/material-ui.ts) for available exports.

## 🧪 Testing Structure

Each component includes:
- `.spec.ts` file following Angular conventions
- Vitest configured for unit testing
- Test utils for component testing

## 🎓 Best Practices Implemented

✅ **Standalone Components** - All components are standalone (Angular 14+)
✅ **Signals** - Reactive state management without RxJS complexity
✅ **Lazy Loading** - Features loaded on demand
✅ **Type Safety** - Strict TypeScript configuration
✅ **OnPush Strategy** - Better performance
✅ **Dependency Injection** - Using `inject()` function
✅ **Reactive Forms** - Better than template-driven forms
✅ **Service Architecture** - Clear separation of concerns
✅ **Interceptors** - Centralized HTTP handling
✅ **Guards** - Route protection and auth flow
✅ **Error Handling** - Global error interceptor with notifications
✅ **Accessibility** - ARIA labels and semantic HTML

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm start
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Run tests**
   ```bash
   npm test
   ```

## 🔧 Configuration Files

- `angular.json` - Angular CLI configuration
- `tsconfig.json` - TypeScript configuration (strict mode)
- `tsconfig.app.json` - App-level TypeScript config
- `tsconfig.spec.json` - Test TypeScript config
- `package.json` - Dependencies and scripts
- `.github/copilot-instructions.md` - AI assistant guidelines

## 📚 Adding New Features

1. **Create feature directory** in `src/app/features/[feature-name]`
2. **Generate structure**:
   ```
   feature-name/
   ├── pages/
   ├── components/
   ├── services/
   ├── models/
   ├── store/
   └── [feature].routes.ts
   ```
3. **Create models** - Define TypeScript interfaces
4. **Create service** - Business logic with `providedIn: 'root'`
5. **Create store** - Signal-based state management
6. **Create pages** - Route-level components
7. **Add routing** - Update feature routes and main routes
8. **Lazy load** - Add to `app.routes.ts`

## 🎨 Styling with SCSS

Global variables and mixins available:
- Material theme variables
- Utility classes (.full-width, .flex-center, etc.)
- Custom scrollbar styling
- Responsive breakpoints

## 💡 Tips & Tricks

- Use `computed()` for derived state instead of calculating in templates
- Use `@if`, `@for`, `@switch` control flow instead of `*ngIf`, `*ngFor`
- Services use `providedIn: 'root'` for singleton pattern
- Components use `input()` and `output()` functions (modern Angular)
- Use `readonly` keyword for immutable references
- Test with MockProviders for services
- Use Material CDK for advanced UI patterns

## 🐛 Troubleshooting

### Build Errors
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Angular cache: `ng cache clean`

### Runtime Errors
- Check browser console for detailed errors
- Enable strict mode: verified in tsconfig.json
- Use DevTools to inspect signals and state

### HTTP Issues
- Verify API URL in environments/environment.ts
- Check CORS configuration if calling external APIs
- Add required headers in interceptors

## 📖 Resources

- [Angular Documentation](https://angular.io)
- [Angular Material](https://material.angular.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [RxJS Documentation](https://rxjs.dev)
- [Angular Style Guide](https://angular.io/guide/styleguide)

---

This enterprise architecture provides a solid foundation for building scalable Angular applications with modern best practices. Extend and customize as needed for your specific requirements.
