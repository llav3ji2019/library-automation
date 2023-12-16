package org.polytech.db.login;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class LoginService {
    private final static String HASH_CODE_ALGORITHM = "SHA-256";

    private final Map<String, String> ADMIN_AUTHORIZED_USERS = Map.of(
            "admin", "jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=" //admin
    );

    private final Map<String, String> WORKER_AUTHORIZED_USERS = Map.of(
            "oleg", "PCCSzTEdCaqlT7Z/Q2nztTIlTAMREarxIT1y6r6L2Ps=" //oleg123
    );

    public LoginStatus checkUser(User user) {
        String adminPassword = ADMIN_AUTHORIZED_USERS.get(user.username());
        String workerPassword = WORKER_AUTHORIZED_USERS.get(user.username());
        if (adminPassword == null && workerPassword == null) {
            return LoginStatus.UNKNOWN;
        }

        try {
            if (adminPassword != null) {
                return adminPassword.equals(hashCode(user.password())) ? LoginStatus.ADMIN: LoginStatus.UNKNOWN;
            }
            return workerPassword.equals(hashCode(user.password())) ? LoginStatus.WORKER : LoginStatus.UNKNOWN;
        }
        catch (NoSuchAlgorithmException e) {
            return LoginStatus.UNKNOWN;
        }
    }

    private static String hashCode(String password) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance(HASH_CODE_ALGORITHM);
        byte[] hash = md.digest(password.getBytes());
        return Base64.getEncoder().encodeToString(hash);
    }
}
