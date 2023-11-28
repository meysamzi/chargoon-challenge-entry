interface IUser {
    title: string
    isDefault: boolean
}

export const onChangeCheckBox = (user: IUser, selectedUsers: any, setSelectedUsers: any) => {
    if (!user.isDefault) {
        const users = selectedUsers.map((x: any) => {
            return { ...x, isDefault: x.title === user.title ? true : false }
        })
        setSelectedUsers(users)
    }
}

export const onDeleting = (title: string, setSelectedUsers: any) => {
    setSelectedUsers((prev: any) => prev.filter((x: any) => x.title !== title))
}

