import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateAdminAccount1700063250544 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            // password is 123
            `INSERT INTO user (username, email, password,role,status,emailVerified) VALUES ('foo', 'admin@gmail.com', '$2b$10$sb6FXe8PuK8w6uioXxVgBe5UG1lJj2dGjf4PzWDlGEvhdCss7SVJ2','Super Admin','VERIFIED',true)`,
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
