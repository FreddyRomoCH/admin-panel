import type { RegisterSchemeType } from "@/features/register/lib/scheme/registerScheme"

interface HeaderSidebarProps {
  name: RegisterSchemeType["first_name"]
}

export default function HeaderLogo({name}: HeaderSidebarProps) {

  const user = name ?? "Admin Panel"

  return <h1 className="dark:text-card">
    { `${user} - User Panel` }
  </h1>
}
