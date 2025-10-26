export const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);


export const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

export const getTransactionIcon = (type: string) => {
    const icons = {
        commission: "💰",
        payout: "🏦",
        client_payment: "📥",
        transfer: "🔄",
    };
    return icons[type as keyof typeof icons] || "💳";
};

