import * as React from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";

export function Drawer({ trigger = "Open drawer", title = "Details", children }: { trigger?: React.ReactNode; title?: string; children: React.ReactNode }) {
  return <BaseDialog.Root><BaseDialog.Trigger className="manner-drawer-trigger">{trigger}</BaseDialog.Trigger><BaseDialog.Portal><BaseDialog.Backdrop className="manner-drawer-backdrop"/><BaseDialog.Viewport className="manner-drawer-layer"><BaseDialog.Popup className="manner-drawer-popup"><header><BaseDialog.Title id="drawer-title">{title}</BaseDialog.Title><BaseDialog.Close aria-label="Close drawer"><X/></BaseDialog.Close></header><div>{children}</div></BaseDialog.Popup></BaseDialog.Viewport></BaseDialog.Portal></BaseDialog.Root>;
}
