package org.polytech.db.utils.exceptionutils;

public class ExceptionUtils {
    public static String getClientError(String serverError) {
        int beginIndex = serverError.indexOf("ERROR:");
        int endIndex = serverError.indexOf("Where: ");
        return serverError.substring(beginIndex, endIndex);
    }
}
