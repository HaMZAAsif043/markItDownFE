declare module "lucide-react" {
  import type { FC, SVGProps } from "react"
  type Icon = FC<SVGProps<SVGSVGElement>>
  export const Upload: Icon
  export const Link: Icon
  export const Copy: Icon
  export const Download: Icon
  export const ArrowRight: Icon
  export const AlertCircle: Icon
  export const Check: Icon
  export const ChevronDown: Icon
  export const ChevronLeft: Icon
  export const Menu: Icon
  export const X: Icon
  export const Plus: Icon
  export const Minus: Icon
  export const Cpu: Icon
  export const BookOpen: Icon
  export const Edit: Icon
  export const ArrowRightToLine: Icon
  export const Search: Icon
  export const WifiOff: Icon
  export const Globe: Icon
  export const Sparkles: Icon
  export const Github: Icon
  export const FileText: Icon
  export const Eye: Icon
  export const FileCode: Icon
  export const Columns2: Icon
  export const Loader2: Icon
  export const Clock: Icon
  export const Trash2: Icon
  export const Hash: Icon
  export const History: Icon
  export const Settings: Icon
  export const RefreshCw: Icon
  export const Sun: Icon
  export const Moon: Icon
  export const Monitor: Icon
  export const UploadIcon: Icon
  export const BarChart3: Icon
  export const ExternalLink: Icon
  export const Cog: Icon
  export const FileJson: Icon
  export const FileType: Icon
  export const FileSpreadsheet: Icon
  export const Table: Icon
  export const Zap: Icon
  export const Code: Icon
}

declare module "sonner" {
  import type { FC, ReactNode } from "react"
  export interface ToasterProps { position?: string; richColors?: boolean; toastOptions?: any }
  export const Toaster: FC<ToasterProps>
  export const toast: { success: (msg: string) => void; error: (msg: string) => void; (msg: string): void }
}
