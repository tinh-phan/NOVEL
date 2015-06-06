namespace NOVEL.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreatev2 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Books", "TotalView", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Books", "TotalView", c => c.String());
        }
    }
}
