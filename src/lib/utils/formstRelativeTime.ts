import i18n from "@/i18n";

export function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();

    // Units convertion
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return `${years} ${i18n.t("year")}${years > 1 ? "s" : ""} ${i18n.t("ago")}`;
    if (months > 0) return `${months} ${i18n.t("month")}${months > 1 ? "s" : ""} ${i18n.t("ago")}`;
    if (weeks > 0) return `${weeks} ${i18n.t("week")}${weeks > 1 ? "s" : ""} ${i18n.t("ago")}`;
    if (days > 0) return `${days} ${i18n.t("day")}${days > 1 ? "s" : ""} ${i18n.t("ago")}`;
    if (hours > 0) return `${hours} ${i18n.t("hour")}${hours > 1 ? "s" : ""} ${i18n.t("ago")}`;
    if (minutes > 0) return `${minutes} ${i18n.t("minute")}${minutes > 1 ? "s" : ""} ${i18n.t("ago")}`;
    return i18n.t("just_now")
}