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
    private final Map<String, String> AUTHORIZED_USERS = Map.of(
            "admin", "jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=",
            "oleg", "uy/u1fkKPQKnxw30g1+f8BMKhhtyY+m7LNEt945+2bw="
    );

    public LoginStatus checkUser(User user) {
        String regularPassword = AUTHORIZED_USERS.get(user.username());
        if (regularPassword == null) {
            return LoginStatus.FAILED;
        }
        try {
            return regularPassword.equals(hashCode(user.password())) ? LoginStatus.SUCCESS: LoginStatus.FAILED;
        }
        catch (NoSuchAlgorithmException e) {
            return LoginStatus.FAILED;
        }
    }

    private static String hashCode(String password) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[] hash = md.digest(password.getBytes());
        return Base64.getEncoder().encodeToString(hash);
    }
}
