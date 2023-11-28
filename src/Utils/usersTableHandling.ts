export const onDeleting = (title: string, setSelectedUsers: any) => {
    setSelectedUsers((prev: any) => prev.filter((x: any) => x.title !== title))
}