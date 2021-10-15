import { User } from '@/lib/api/types'

const authStorage = {
    get: function() {
        const userData = sessionStorage.getItem('user')

        return userData ? JSON.parse(userData) : null;
    },
    set: function(user: User) {
        sessionStorage.setItem('user', JSON.stringify(user))
    },
    clean: function() {
        sessionStorage.removeItem('user')
    }
}

export default authStorage