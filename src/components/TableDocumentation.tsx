import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { 
  ChevronDown, 
  ChevronRight, 
  Home, 
  MessageSquare, 
  Layout, 
  Calendar, 
  Mail, 
  ShieldCheck, 
  ShoppingCart, 
  Grid3x3,
  Menu,
  Settings,
  Bell,
  User
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  expanded?: boolean;
}

export function TableDocumentation() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { label: 'Home', icon: <Home size={16} /> },
    { 
      label: 'Pages', 
      icon: <Layout size={16} />,
      children: [
        { label: 'Starter' },
        { label: 'Landing' },
        { label: 'Pricing' },
      ]
    },
    { label: 'Chat', icon: <MessageSquare size={16} /> },
    { label: 'Kanban', icon: <Grid3x3 size={16} /> },
    { label: 'Calendar', icon: <Calendar size={16} /> },
    { 
      label: 'Email', 
      icon: <Mail size={16} />,
      children: [
        { label: 'Inbox' },
        { label: 'Email detail' },
        { label: 'Compose' },
      ]
    },
    { label: 'Authentication', icon: <ShieldCheck size={16} /> },
    { 
      label: 'E-commerce', 
      icon: <ShoppingCart size={16} />,
      children: [
        { label: 'Product' },
        { label: 'Product details' },
        { label: 'Orders' },
        { label: 'Customers' },
      ]
    },
    { label: 'Widgets' },
    { 
      label: 'Components', 
      expanded: true,
      children: [
        { label: 'Accordion' },
        { label: 'Alerts' },
        { label: 'Avatar' },
        { label: 'Background' },
        { label: 'Badges' },
        { label: 'Breadcrumb' },
        { label: 'Bulk select' },
        { label: 'Buttons' },
        { label: 'Cards' },
        { label: 'Carousel' },
      ]
    },
  ]);

  const toggleMenuItem = (index: number) => {
    const newMenuItems = [...menuItems];
    newMenuItems[index].expanded = !newMenuItems[index].expanded;
    setMenuItems(newMenuItems);
  };

  const renderMenuItem = (item: MenuItem, index: number, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = item.expanded;

    return (
      <div key={index}>
        <button
          onClick={() => hasChildren && toggleMenuItem(index)}
          className={`w-full flex items-center gap-2 px-4 py-2 text-sm text-left hover:bg-muted/50 transition-colors ${
            level > 0 ? 'pl-8' : ''
          }`}
        >
          {item.icon && <span className="text-muted-foreground">{item.icon}</span>}
          <span className="flex-1">{item.label}</span>
          {hasChildren && (
            isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
          )}
        </button>
        {hasChildren && isExpanded && (
          <div className="bg-muted/20">
            {item.children!.map((child, childIndex) => (
              <button
                key={childIndex}
                className="w-full flex items-center gap-2 px-4 py-2 pl-12 text-sm text-left hover:bg-muted/50 transition-colors text-muted-foreground"
              >
                {child.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const tableData = [
    { id: 1, first: 'Steven', last: 'Speilberg', handle: '@mdo' },
    { id: 2, first: 'Martin', last: 'Scorsese', handle: '@fat' },
    { id: 3, first: 'James', last: 'Cameron', handle: '@twitter' },
  ];

  const darkTableData = [
    { id: 1, first: 'Client', last: 'Eastwood', handle: '@mdo' },
    { id: 2, first: 'Quentin', last: 'Tarantino', handle: '@fat' },
    { id: 3, first: 'Redley', last: 'Scott', handle: '@twitter' },
  ];

  const codeExample = `<div class="table-responsive">
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
      </tr>
    </thead>
  </table>
</div>`;

  const darkCodeExample = `<div class="table table-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th class="white-space-nowrap" scope="col">Handle</th>
    </tr>
  </thead>
</div>`;

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div 
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } transition-all duration-300 border-r border-border bg-card overflow-hidden`}
      >
        <ScrollArea className="h-full">
          <div className="py-4">
            {menuItems.map((item, index) => renderMenuItem(item, index))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <div className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={20} />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">F</span>
              </div>
              <span className="text-primary text-xl">falcon</span>
            </div>
            <nav className="hidden md:flex items-center gap-1 ml-8">
              <Button variant="ghost" size="sm">
                Home
              </Button>
              <Button variant="ghost" size="sm">
                Pages <ChevronDown size={14} className="ml-1" />
              </Button>
              <Button variant="ghost" size="sm">
                Documentation <ChevronDown size={14} className="ml-1" />
              </Button>
              <Button variant="ghost" size="sm">
                Widgets
              </Button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <span className="hidden sm:inline">Bootstrap 5</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Button>
            <Button variant="ghost" size="icon">
              <Settings size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart size={18} />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                2
              </Badge>
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Page Content */}
        <ScrollArea className="flex-1">
          <div className="p-6 md:p-8 max-w-7xl">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="mb-2">Tables</h1>
              <p className="text-muted-foreground">
                Documentation and examples for opt-in styling of tables with Falcon.
              </p>
              <a href="#" className="text-primary text-sm inline-flex items-center gap-1 mt-2 hover:underline">
                Tables on Bootstrap
                <ChevronRight size={14} />
              </a>
            </div>

            {/* Tables Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Light Table Example */}
              <div>
                <h2 className="mb-4">Example</h2>
                <Card className="overflow-hidden mb-4">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm">#</th>
                          <th className="px-4 py-3 text-left text-sm">First</th>
                          <th className="px-4 py-3 text-left text-sm">Last</th>
                          <th className="px-4 py-3 text-left text-sm">Handle</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.map((row) => (
                          <tr key={row.id} className="border-t border-border">
                            <td className="px-4 py-3 text-sm">{row.id}</td>
                            <td className="px-4 py-3 text-sm">{row.first}</td>
                            <td className="px-4 py-3 text-sm">{row.last}</td>
                            <td className="px-4 py-3 text-sm text-primary">{row.handle}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>

                {/* Code Block */}
                <Card className="bg-slate-900 text-slate-100 overflow-hidden">
                  <pre className="p-4 text-xs overflow-x-auto">
                    <code>
                      <span className="text-slate-500">&lt;div</span>{' '}
                      <span className="text-sky-300">class</span>=
                      <span className="text-emerald-300">"table-responsive"</span>
                      <span className="text-slate-500">&gt;</span>
                      {'\n  '}
                      <span className="text-slate-500">&lt;table</span>{' '}
                      <span className="text-sky-300">class</span>=
                      <span className="text-emerald-300">"table"</span>
                      <span className="text-slate-500">&gt;</span>
                      {'\n    '}
                      <span className="text-slate-500">&lt;thead&gt;</span>
                      {'\n      '}
                      <span className="text-slate-500">&lt;tr&gt;</span>
                      {'\n        '}
                      <span className="text-slate-500">&lt;th</span>{' '}
                      <span className="text-sky-300">scope</span>=
                      <span className="text-emerald-300">"col"</span>
                      <span className="text-slate-500">&gt;</span>#
                      <span className="text-slate-500">&lt;/th&gt;</span>
                      {'\n        '}
                      <span className="text-slate-500">&lt;th</span>{' '}
                      <span className="text-sky-300">scope</span>=
                      <span className="text-emerald-300">"col"</span>
                      <span className="text-slate-500">&gt;</span>First
                      <span className="text-slate-500">&lt;/th&gt;</span>
                      {'\n        '}
                      <span className="text-slate-500">&lt;th</span>{' '}
                      <span className="text-sky-300">scope</span>=
                      <span className="text-emerald-300">"col"</span>
                      <span className="text-slate-500">&gt;</span>Last
                      <span className="text-slate-500">&lt;/th&gt;</span>
                      {'\n        '}
                      <span className="text-slate-500">&lt;th</span>{' '}
                      <span className="text-sky-300">scope</span>=
                      <span className="text-emerald-300">"col"</span>
                      <span className="text-slate-500">&gt;</span>Handle
                      <span className="text-slate-500">&lt;/th&gt;</span>
                      {'\n      '}
                      <span className="text-slate-500">&lt;/tr&gt;</span>
                      {'\n    '}
                      <span className="text-slate-500">&lt;/thead&gt;</span>
                      {'\n  '}
                      <span className="text-slate-500">&lt;/table&gt;</span>
                      {'\n'}
                      <span className="text-slate-500">&lt;/div&gt;</span>
                    </code>
                  </pre>
                </Card>
              </div>

              {/* Dark Table Example */}
              <div>
                <h2 className="mb-4">Dark</h2>
                <Card className="overflow-hidden mb-4 bg-slate-800 border-slate-700">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-900">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm text-slate-200">#</th>
                          <th className="px-4 py-3 text-left text-sm text-slate-200">First</th>
                          <th className="px-4 py-3 text-left text-sm text-slate-200">Last</th>
                          <th className="px-4 py-3 text-left text-sm text-slate-200">Handle</th>
                        </tr>
                      </thead>
                      <tbody>
                        {darkTableData.map((row) => (
                          <tr key={row.id} className="border-t border-slate-700">
                            <td className="px-4 py-3 text-sm text-slate-300">{row.id}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{row.first}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{row.last}</td>
                            <td className="px-4 py-3 text-sm text-sky-400">{row.handle}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>

                {/* Dark Code Block */}
                <Card className="bg-slate-900 text-slate-100 overflow-hidden">
                  <pre className="p-4 text-xs overflow-x-auto">
                    <code>
                      <span className="text-slate-500">&lt;div</span>{' '}
                      <span className="text-sky-300">class</span>=
                      <span className="text-emerald-300">"table table-dark"</span>
                      <span className="text-slate-500">&gt;</span>
                      {'\n  '}
                      <span className="text-slate-500">&lt;thead&gt;</span>
                      {'\n    '}
                      <span className="text-slate-500">&lt;tr&gt;</span>
                      {'\n      '}
                      <span className="text-slate-500">&lt;th</span>{' '}
                      <span className="text-sky-300">scope</span>=
                      <span className="text-emerald-300">"col"</span>
                      <span className="text-slate-500">&gt;</span>#
                      <span className="text-slate-500">&lt;/th&gt;</span>
                      {'\n      '}
                      <span className="text-slate-500">&lt;th</span>{' '}
                      <span className="text-sky-300">scope</span>=
                      <span className="text-emerald-300">"col"</span>
                      <span className="text-slate-500">&gt;</span>First
                      <span className="text-slate-500">&lt;/th&gt;</span>
                      {'\n      '}
                      <span className="text-slate-500">&lt;th</span>{' '}
                      <span className="text-sky-300">scope</span>=
                      <span className="text-emerald-300">"col"</span>
                      <span className="text-slate-500">&gt;</span>Last
                      <span className="text-slate-500">&lt;/th&gt;</span>
                      {'\n      '}
                      <span className="text-slate-500">&lt;th</span>{' '}
                      <span className="text-sky-300">class</span>=
                      <span className="text-emerald-300">"white-space-nowrap"</span>{' '}
                      <span className="text-sky-300">scope</span>=
                      <span className="text-emerald-300">"col"</span>
                      <span className="text-slate-500">&gt;</span>Handle
                      <span className="text-slate-500">&lt;/th&gt;</span>
                      {'\n    '}
                      <span className="text-slate-500">&lt;/tr&gt;</span>
                      {'\n  '}
                      <span className="text-slate-500">&lt;/thead&gt;</span>
                      {'\n'}
                      <span className="text-slate-500">&lt;/div&gt;</span>
                    </code>
                  </pre>
                </Card>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
