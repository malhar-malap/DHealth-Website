package com.healthcare.portal.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * DataInitializer - Empty.
 * Categories and Deal Types are managed manually in the database.
 */
@Component
public class DataInitializer implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {
        // No auto-insertion — categories and deal types are managed manually.
    }
}
